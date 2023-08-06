-- CreateTable
CREATE TABLE "Groups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    CONSTRAINT "Users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "occurred_at" TEXT NOT NULL,
    "redirect" TEXT,
    "description" TEXT,
    "x_request_id" TEXT,
    "actor_id" TEXT NOT NULL,
    "target_id" TEXT,
    CONSTRAINT "Events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
