type SeedData = {
  entries: SeedEntry[]
}

type SeedEntry = {
  description: string
  createdAt: number
  status: string
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "pendiente: lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "in-progress: lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      status: "in-progress",
      createdAt: Date.now() - 1_000_000,
    },
    {
      description:
        "teminadas: lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      status: "finished",
      createdAt: Date.now() - 100_000,
    },
  ],
}
