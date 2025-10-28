import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createItem(inventoryId, data) {
  // Вставила до 5 раз (на случай коллизий)
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      // Генерировала customId по правилам (временно)
      const customId = generateCustomId();

      // Пытаемся вставить
      const newItem = await prisma.item.create({
        data: {
          inventoryId,
          customId,
          ...data,
        },
      });
      return newItem;
    } catch (err) {
      if (err.code === "P2002") {
        // Сделала дубликат customId
        console.warn("Duplicate customId, retrying...");
        continue; // попытка снова
      }
      throw err;
    }
  }
  throw new Error("Failed to generate unique customId after multiple attempts");
}

function generateCustomId() {
  // Пример: PREFIX + случайное 6-значное число
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ITM-${random}`;
}
