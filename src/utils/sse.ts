export const responseSSE = (
  { request }: { request: Request },
  callback: (sendEvent: (data: any) => void) => Promise<void>
) => {
  const body = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
  
      const sendEvent = (data: any) => {
        const message = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(message));
      };

      callback(sendEvent)
      request.signal.addEventListener('abort', () => {
        controller.close();
      });
    }
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}

