import { prisma } from "./prisma";
import { randomPointInHelsinki } from "./utils/randomPoint";

const pictures = [
  "https://plus.unsplash.com/premium_photo-1668127296366-c336da2eb6d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHlvdW5nJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1508002366005-75a695ee2d17?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHlvdW5nJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1598812471823-514e378adf08?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHlvdW5nJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHlvdW5nJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW91bmclMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW91bmclMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW91bmclMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1613005798967-632017e477c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1667132970685-a2109a3ed00d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1488371934083-edb7857977df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1610088441520-4352457e7095?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675080431459-92373a9efd84?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVufGVufDB8fDB8fHww",
];

export const updateDb = async () => {
  console.log("UPDATE DB");

  const users = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
  });

  for (const user of users) {
    const [latitude, longitude] = randomPointInHelsinki();

    const birthday = new Date(
      `${1980 + Math.floor(Math.random() * 20)}-0${
        1 + Math.floor(Math.random() * 8)
      }-01`
    );

    const genderInterests = [
      "MALE",
      "FEMALE",
      "TRANS_MAN",
      "TRANS_WOMAN",
      "OTHER",
    ].filter((e) => Math.random() > 0.7);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        birthday,
        picture1: pictures[Math.floor(Math.random() * pictures.length)],
        latitude,
        longitude,

        genderInterests:
          genderInterests.length > 0
            ? genderInterests
            : ([
                ["MALE", "FEMALE", "TRANS_MAN", "TRANS_WOMAN", "OTHER"][
                  Math.floor(5 * Math.random())
                ],
              ] as any),

        gender: ["MALE", "FEMALE", "TRANS_MAN", "TRANS_WOMAN", "OTHER"][
          Math.floor(5 * Math.random())
        ] as any,
      },
    });

    console.log("Updated user:" + user.id);
  }
};
