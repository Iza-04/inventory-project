import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function generateSequence(inventoryId) {
  return prisma.$transaction(async (tx) => {
    const seq = await tx.customIdSequence.findUnique({
      where: { inventoryId },
    });
    if (!seq) {
      await tx.customIdSequence.create({ data: { inventoryId, last: 1 } });
      return 1;
    }
    const updated = await tx.customIdSequence.update({
      where: { inventoryId },
      data: { last: { increment: 1 } },
    });
    return updated.last;
  });
}

export async function createItem(inventoryId, data, idTemplate) {
  // idTemplate: array of elements, eg [{type:'fixed','value':'ITM-'}, {type:'sequence', format: '0004'}]
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      // generate parts
      let customId = await buildCustomId(inventoryId, idTemplate);
      const newItem = await prisma.item.create({
        data: {
          inventoryId,
          customId,
          data,
        },
      });
      return newItem;
    } catch (err) {
      // Prisma unique violation code for composite unique -> P2002
      if (err.code === "P2002") {
        continue;
      }
      throw err;
    }
  }
  throw new Error("Failed to generate unique customId after retries");
}

async function buildCustomId(inventoryId, template) {
  const parts = await Promise.all(
    template.map(async (el) => {
      switch (el.type) {
        case "fixed":
          return el.value;
        case "guid":
          return crypto.randomUUID();
        case "datetime":
          return new Date().toISOString().replace(/[:.]/g, "");
        case "rand6":
          return Math.floor(100000 + Math.random() * 900000)
            .toString()
            .padStart(6, "0");
        case "rand9":
          return Math.floor(100000000 + Math.random() * 900000000)
            .toString()
            .padStart(9, "0");
        case "rand20":
          return Math.floor(Math.random() * (1 << 20)).toString();
        case "rand32":
          return Math.floor(Math.random() * 2 ** 32).toString();
        case "sequence": {
          const seq = await generateSequence(inventoryId);
          return el.format
            ? seq.toString().padStart(el.format.length, "0")
            : String(seq);
        }
        default:
          return "";
      }
    })
  );
  return parts.join(el?.separator || "");
}
