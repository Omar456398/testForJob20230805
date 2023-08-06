import { LogData } from "@/components/types/general";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { PrismaClient } from "@prisma/client";

const msgErrors: { [key: string]: any } = {
  wrong_arguments: "Please make sure arguments are entered correctly!",
};

let prismaClient = new PrismaClient();

function reshapeEvent(event: { [key: string]: any }) {
  let eventReshaped: LogData = {
    id: event.id,
    action: {
      id: event.id,
      object: "event_action",
      name: event.name,
    },
    group: event.actor.group.name,
    object: "event",
    actor_id: event.actor.id,
    actor_name: event.actor.name,
    actor_email: event.actor.email,
    location: event.location,
    occurred_at: event.occurred_at,
    target_id: event.target?.id,
    target_name: event.target?.name,
  };
  if (event.x_request_id || event.description || event.redirect) {
    eventReshaped.metadata = {
      x_request_id: event.x_request_id,
      description: event.description,
      redirect: event.redirect,
    };
  }
  return eventReshaped;
}

function checkBody(
  body: { [key: string]: any },
  expectedKeys: string[],
  requiredKeys: string[]
) {
  let bodyKeys = Object.keys(body);
  let isValidated = true;
  bodyKeys.forEach((key) => {
    if (!expectedKeys.includes(key)) {
      isValidated = false;
    }
  });
  requiredKeys.forEach((key) => {
    if (!bodyKeys.includes(key)) {
      isValidated = false;
    }
  });
  return isValidated;
}

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("q");
  const actorID = request.nextUrl.searchParams.get("actor_id");
  const actionID = request.nextUrl.searchParams.get("action_id");
  const targetID = request.nextUrl.searchParams.get("target_id");
  const page = Number(request.nextUrl.searchParams.get("page") || 0);
  const pastCount = Number(request.nextUrl.searchParams.get("past_count") || 0);

  const itemsPerPage = 10;
  let skip = page * itemsPerPage,
    take = itemsPerPage + 1;

  let whereClause: any = {};
  if (searchQuery) {
    whereClause.OR = [
      {
        actor: {
          name: {
            contains: searchQuery,
          },
        },
      },
      {
        actor: {
          email: {
            contains: searchQuery,
          },
        },
      },
      {
        id: {
          contains: searchQuery,
        },
      },
      {
        name: {
          contains: searchQuery,
        },
      },
    ];
  }
  if (actionID) {
    whereClause.id = {
      contains: actionID,
    };
  }
  if (actorID) {
    whereClause.actor = {
      id: {
        contains: actorID,
      },
    };
  }
  if (targetID) {
    whereClause.target = {
      id: {
        contains: targetID,
      },
    };
  }
  let eventsCount = await prismaClient.events.count({
    where: whereClause,
  });
  if (pastCount && pastCount < eventsCount) {
    skip += eventsCount - pastCount;
  }
  let eventsFiltered = await prismaClient.events.findMany({
    include: {
      actor: {
        include: { group: true },
      },
      target: true,
    },
    orderBy: {
      occurred_at: 'desc'
    },
    where: whereClause,
    skip,
    take,
  });
  return NextResponse.json(
    {
      events: eventsFiltered.slice(0, 10).map((item) => reshapeEvent(item)),
      isNext: !!eventsFiltered[10],
      count: eventsCount,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    let expectedKeys = [
      "name",
      "location",
      "redirect",
      "description",
      "x_request_id",
      "actor_id",
      "target_id",
    ];
    let requiredKeys = ["name", "location", "actor_id"];

    const body = await request.json();
    if (!checkBody(body, expectedKeys, requiredKeys)) {
      throw new Error("wrong_arguments");
    }
    body.occurred_at = new Date().toISOString();
    let eventNew = await prismaClient.events.create({
      data: body,
    });
    return NextResponse.json(
      {
        message: "success",
        event: eventNew,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: msgErrors[err.message] || "Unknown error occured!" },
      { status: 500 }
    );
  }
}
