
import { PrismaClient } from "@prisma/client"
import { hash } from "argon2"
import { Random } from "mockjs"
import  _ from "lodash"

const prisma = new PrismaClient()
async function run() {
    try {
        await prisma.user.create({
            data: {
                name: "ff",
                password: await hash("admin888"),
                role: "admin",
            },
        });
        for (let i = 0; i < 6; i++) {
            await prisma.category.create({
                data: {
                    title: Random.ctitle(2, 6),
                },
            });
        }
        for (let i = 0; i < 15; i++) {
            await prisma.article.create({
                data: {
                    title: Random.ctitle(10, 20),
                    content: Random.cparagraph(30, 50),
                    categoryId: _.random(1, 5),
                    image: "",
                },
            });
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}
run()