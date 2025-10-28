const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

function randDigits(n) {
  return Math.floor(Math.random() * Math.pow(10, n))
    .toString()
    .padStart(n, "0");
}

async function generateCustomId(inventoryId, config) {
  // config = [{type:'fixed', value:'INV-'}, {type:'date', format:'YYYYMMdd'}, {type:'seq', pad:4}, ...]
  const parts = [];
  for (const el of config) {
    if (el.type === "fixed") parts.push(el.value);
    if (el.type === "guid") parts.push(uuidv4());
    if (el.type === "rand6") parts.push(randDigits(6));
    if (el.type === "rand9") parts.push(randDigits(9));
    if (el.type === "date") parts.push(/* format with dayjs or date-fns */);
    if (el.type === "seq") {
      // atomically increment sequence row for this inventory
      const seq = await prisma.$transaction(async (tx) => {
        const row = await tx.customIdSequence.findUnique({
          where: { inventoryId },
        });
        if (row) {
          const updated = await tx.customIdSequence.update({
            where: { inventoryId },
            data: { last: row.last + 1 },
          });
          return updated.last;
        } else {
          const created = await tx.customIdSequence.create({
            data: { inventoryId, last: 1 },
          });
          return created.last;
        }
      });
      parts.push(String(seq).padStart(el.pad || 0, "0"));
    }
  }
  return parts.join("");
}
