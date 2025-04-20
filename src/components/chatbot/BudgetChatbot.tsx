
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle, MessageSquare, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Halo! Saya asisten keuangan Dana Sehat Mandiri. Saya dapat membantu Anda dengan pertanyaan seputar anggaran, investasi, dan perencanaan keuangan. Apa yang ingin Anda tanyakan?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const sampleResponses: Record<string, string> = {
  "investasi": "Berdasarkan profil risiko Anda yang moderat, saya menyarankan alokasi investasi: 30% Deposito/Pasar Uang, 40% Obligasi, dan 30% Saham melalui Reksa Dana.",
  "hutang": "Untuk mengelola hutang dengan efektif, prioritaskan melunasi hutang dengan bunga tertinggi terlebih dahulu. Usahakan agar total pembayaran hutang tidak melebihi 30% dari pendapatan bulanan Anda.",
  "tabungan": "Saya merekomendasikan target dana darurat sebesar 6 kali pengeluaran bulanan. Saat ini Anda baru mencapai 65% dari target tersebut.",
  "pensiun": "Untuk persiapan pensiun, mulailah menabung minimal 15% dari pendapatan sekarang. Dengan gaji Rp12.750.000, Anda sebaiknya menyisihkan minimal Rp1.912.500 per bulan untuk dana pensiun.",
  "asuransi": "Sebagai tenaga kesehatan, Anda perlu memiliki asuransi jiwa (minimal 10x pendapatan tahunan), asuransi kesehatan komprehensif, dan asuransi perlindungan profesi.",
};

const BudgetChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const generateResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    for (const [keyword, response] of Object.entries(sampleResponses)) {
      if (lowercaseQuery.includes(keyword)) {
        return response;
      }
    }
    
    return "Mohon maaf, saya belum bisa menjawab pertanyaan tersebut dengan spesifik. Silakan konsultasikan dengan perencana keuangan untuk saran yang lebih personal.";
  };
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-dsm-blue" />
          <CardTitle>Asisten Anggaran AI</CardTitle>
        </div>
        <CardDescription>
          Tanyakan hal-hal seputar anggaran dan keuangan Anda
        </CardDescription>
      </CardHeader>
      <div className="bg-destructive bg-opacity-10 border-y border-destructive border-opacity-20 p-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
          <p className="text-sm text-destructive">
            Perhatian: Asisten AI ini hanya memberikan informasi umum. Untuk saran keuangan yang spesifik dan personal, konsultasikan dengan perencana keuangan tersertifikasi.
          </p>
        </div>
      </div>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-dsm-blue text-white'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ketik pesan Anda di sini..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BudgetChatbot;
