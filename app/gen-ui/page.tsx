'use client';

import { Stock } from '@/shared/ui/Stock';
import { Weather } from '@/shared/ui/Weather';
import { useChat } from 'ai/react';

export default function Page() {
    const { messages, input, setInput, handleSubmit } = useChat({
        api: '/api/v1/questions-stream'
    });

    return (
        <div>
            {messages.map(message => (
                <div key={message.id}>
                    <div>{message.role}</div>
                    <div>{message.content}</div>

                    <div>
                        {message.toolInvocations?.map(toolInvocation => {
                            const { toolName, toolCallId, state } = toolInvocation;

                            if (state === 'result') {
                                if (toolName === 'displayWeather') {
                                    const { result } = toolInvocation;
                                    return (
                                        <div key={toolCallId}>
                                            <Weather {...result} />
                                        </div>
                                    );
                                } else if (toolName === 'getStockPrice') {
                                    const { result } = toolInvocation;
                                    return <Stock {...result} />;
                                }
                            } else {
                                return (
                                    <div key={toolCallId}>
                                        {toolName === 'displayWeather' ? (
                                            <div>Loading weather...</div>
                                        ) : toolName === 'getStockPrice' ? (
                                            <div>Loading stock price...</div>
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={event => {
                        setInput(event.target.value);
                    }}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}