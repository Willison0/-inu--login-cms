import { NextResponse } from 'next/server';

export function badRequest400({ message } = { message: 'bad request' }) {
  return NextResponse.json({ error: message }, { status: 400, statusText: 'Bad_request' });
}

export function unauthorized401({ message } = { message: 'unauthorized' }) {
  return NextResponse.json({ error: message }, { status: 401, statusText: 'Unauthorized' });
}

export function forbidden403({ message } = { message: 'forbidden' }) {
  return NextResponse.json(
    {
      error: message
    },
    {
      status: 403,
      statusText: 'Forbidden'
    }
  );
}

export function notFound404({ message } = { message: 'not found' }) {
  return NextResponse.json({ error: message }, { status: 404, statusText: 'Not Found' });
}

export function server500({ message } = { message: 'Something went wrong' }) {
  return NextResponse.json(
    { error: message },
    {
      status: 500,
      statusText: 'Server Error'
    }
  );
}

export function ok200({ response } = { response: {} }) {
  return NextResponse.json(
    { ...response, error: null, ok: true },
    {
      status: 200,
      statusText: 'ok'
    }
  );
}
export function ok303({ response } = { response: {} }) {
  return NextResponse.json(
    { ...response, error: null, ok: true },
    {
      status: 200,
      statusText: 'logout'
    }
  );
}

export function ok201({ response } = { response: {} }) {
  return NextResponse.json(
    { ...response, error: null, created: true },
    {
      status: 201,
      statusText: 'created'
    }
  );
}

export function accepted202({ response, message } = { response: {}, message: null }) {
  return NextResponse.json(
    { error: message, ...response },
    {
      status: 201,
      statusText: 'accepted'
    }
  );
}

export function noContent201({ message } = { message: null }) {
  return NextResponse.json(
    { error: message, ok: true },
    {
      status: 201,
      statusText: 'no content'
    }
  );
}

export function unknown500({ message } = { message: 'something went wrong' }) {
  return NextResponse.json(
    { error: message },
    {
      status: 500,
      statusText: 'unknown server error'
    }
  );
}
