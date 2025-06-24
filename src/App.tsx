// src/App.tsx
import React from "react";
import { useChat } from "ai/react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
	// Point to your custom backend server endpoint
	// Replace 'http://localhost:3001/chat' with the actual URL of your backend chat endpoint.
	const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
		api: "http://localhost:3001/chat", // IMPORTANT: This is where you configure your backend endpoint
	});

	return (
		<div className="flex flex-col h-screen bg-gray-100 items-center justify-center p-4 font-sans">
			<div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md flex flex-col h-full md:h-3/4">
				<h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">AI Chat POC</h1>

				{/* Message display area */}
				<div className="flex-1 overflow-y-auto mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col space-y-3">
					{messages.length > 0 ? (
						messages.map((m) => (
							<div
								key={m.id}
								className={`p-4 rounded-lg shadow-sm max-w-[85%] break-words ${
									m.role === "user"
										? "bg-blue-600 text-white self-end ml-auto rounded-br-none"
										: "bg-gray-200 text-gray-800 self-start mr-auto rounded-bl-none"
								}`}
							>
								<strong className="capitalize">{m.role}: </strong>
								{m.content}
							</div>
						))
					) : (
						<div className="text-center text-gray-500 mt-auto mb-auto animate-fade-in">
							Start a conversation! Type your message below.
						</div>
					)}
				</div>

				{/* Input form */}
				<form onSubmit={handleSubmit} className="flex gap-3">
					<Input
						className="flex-1 px-4 py-3 rounded-lg text-base border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
						value={input}
						placeholder={isLoading ? "Generating response..." : "Type your message..."}
						onChange={handleInputChange}
						disabled={isLoading}
					/>
					<Button
						type="submit"
						className="px-6 py-3 rounded-lg text-base font-semibold transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
						disabled={isLoading || !input.trim()}
					>
						{isLoading ? "Sending..." : "Send"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default App;
