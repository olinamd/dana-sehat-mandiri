
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const questions = [
  {
    id: 1,
    question: "Berapa lama Anda berencana untuk berinvestasi?",
    options: [
      { value: "1", label: "Kurang dari 1 tahun", points: 1 },
      { value: "2", label: "1-3 tahun", points: 2 },
      { value: "3", label: "3-5 tahun", points: 3 },
      { value: "4", label: "5-10 tahun", points: 4 },
      { value: "5", label: "Lebih dari 10 tahun", points: 5 },
    ],
  },
  {
    id: 2,
    question: "Bagaimana sikap Anda jika nilai investasi Anda turun 20%?",
    options: [
      { value: "1", label: "Saya akan menjual semua investasi saya", points: 1 },
      { value: "2", label: "Saya akan menjual sebagian investasi saya", points: 2 },
      { value: "3", label: "Saya akan menunggu dan tidak melakukan apa-apa", points: 3 },
      { value: "4", label: "Saya akan menambah sedikit investasi saya", points: 4 },
      { value: "5", label: "Saya akan menambah banyak investasi saya", points: 5 },
    ],
  },
  {
    id: 3,
    question: "Apa tujuan utama investasi Anda?",
    options: [
      { value: "1", label: "Menjaga nilai uang dari inflasi", points: 1 },
      { value: "2", label: "Pendapatan tambahan reguler", points: 2 },
      { value: "3", label: "Pertumbuhan moderat dengan risiko sedang", points: 3 },
      { value: "4", label: "Pertumbuhan jangka panjang", points: 4 },
      { value: "5", label: "Pertumbuhan maksimal dengan risiko tinggi", points: 5 },
    ],
  },
  {
    id: 4,
    question: "Berapa persen dari penghasilan bulanan yang dapat Anda investasikan?",
    options: [
      { value: "1", label: "Kurang dari 10%", points: 1 },
      { value: "2", label: "10-20%", points: 2 },
      { value: "3", label: "20-30%", points: 3 },
      { value: "4", label: "30-40%", points: 4 },
      { value: "5", label: "Lebih dari 40%", points: 5 },
    ],
  },
  {
    id: 5,
    question: "Bagaimana pengetahuan Anda tentang investasi?",
    options: [
      { value: "1", label: "Sangat terbatas", points: 1 },
      { value: "2", label: "Dasar", points: 2 },
      { value: "3", label: "Sedang", points: 3 },
      { value: "4", label: "Baik", points: 4 },
      { value: "5", label: "Sangat baik / Profesional", points: 5 },
    ],
  },
];

const riskProfiles = [
  {
    name: "Konservatif",
    range: "5-11",
    description: "Anda mengutamakan keamanan dan stabilitas. Instrumen investasi yang cocok: Deposito, Obligasi Pemerintah, Reksa Dana Pasar Uang.",
    allocation: [
      { name: "Deposito/Pasar Uang", percentage: 70 },
      { name: "Obligasi", percentage: 25 },
      { name: "Saham", percentage: 5 },
    ],
  },
  {
    name: "Moderat-Konservatif",
    range: "12-15",
    description: "Anda berhati-hati namun terbuka pada sedikit risiko. Instrumen investasi yang cocok: Reksa Dana Pendapatan Tetap, Obligasi Korporasi, dan sedikit alokasi pada Reksa Dana Campuran.",
    allocation: [
      { name: "Deposito/Pasar Uang", percentage: 50 },
      { name: "Obligasi", percentage: 40 },
      { name: "Saham", percentage: 10 },
    ],
  },
  {
    name: "Moderat",
    range: "16-19",
    description: "Anda mencari keseimbangan antara pertumbuhan dan keamanan. Instrumen investasi yang cocok: Reksa Dana Campuran, Obligasi Korporasi, dan alokasi seimbang pada Reksa Dana Saham.",
    allocation: [
      { name: "Deposito/Pasar Uang", percentage: 30 },
      { name: "Obligasi", percentage: 40 },
      { name: "Saham", percentage: 30 },
    ],
  },
  {
    name: "Moderat-Agresif",
    range: "20-23",
    description: "Anda mencari pertumbuhan dan bersedia menerima fluktuasi. Instrumen investasi yang cocok: Reksa Dana Saham, ETF, dan sebagian kecil di saham individual.",
    allocation: [
      { name: "Deposito/Pasar Uang", percentage: 15 },
      { name: "Obligasi", percentage: 35 },
      { name: "Saham", percentage: 50 },
    ],
  },
  {
    name: "Agresif",
    range: "24-25",
    description: "Anda mencari pertumbuhan maksimal dan bersedia menerima risiko tinggi. Instrumen investasi yang cocok: Saham individual, Reksa Dana Saham sektor khusus, dan instrumen derivatif.",
    allocation: [
      { name: "Deposito/Pasar Uang", percentage: 5 },
      { name: "Obligasi", percentage: 15 },
      { name: "Saham", percentage: 80 },
    ],
  },
];

const RiskProfile = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  
  const calculateScore = () => {
    let totalScore = 0;
    
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const option = question.options.find(opt => opt.value === answerValue);
        if (option) {
          totalScore += option.points;
        }
      }
    });
    
    return totalScore;
  };
  
  const getProfile = (score: number) => {
    if (score <= 11) return riskProfiles[0];
    if (score <= 15) return riskProfiles[1];
    if (score <= 19) return riskProfiles[2];
    if (score <= 23) return riskProfiles[3];
    return riskProfiles[4];
  };
  
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleSubmit = () => {
    setShowResult(true);
  };
  
  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };
  
  const score = calculateScore();
  const profile = getProfile(score);
  const allQuestionsAnswered = questions.length === Object.keys(answers).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Profil Risiko</h1>
      
      {!showResult ? (
        <Card>
          <CardHeader>
            <CardTitle>Kuesioner Profil Risiko</CardTitle>
            <CardDescription>
              Jawab semua pertanyaan untuk menentukan profil risiko investasi Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{question.question}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Jawaban ini membantu menentukan toleransi risiko Anda</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <RadioGroup 
                  value={answers[question.id]} 
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
                      <Label htmlFor={`q${question.id}-${option.value}`} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            
            <Button 
              className="w-full mt-4" 
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
            >
              Lihat Hasil
            </Button>
            
            {!allQuestionsAnswered && (
              <div className="flex items-center justify-center gap-2 text-amber-600 mt-2">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm">Mohon jawab semua pertanyaan</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Hasil Profil Risiko</CardTitle>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Ulangi Kuesioner
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-dsm-blue">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Skor: {score} dari 25 (Rentang: {profile.range})
                  </p>
                </div>
                <div className="bg-dsm-blue bg-opacity-10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-dsm-blue" />
                </div>
              </div>
              
              <p className="text-sm">{profile.description}</p>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Rekomendasi Alokasi Aset</h4>
                <div className="space-y-3">
                  {profile.allocation.map((allocation) => (
                    <div key={allocation.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{allocation.name}</span>
                        <span className="text-sm font-medium">{allocation.percentage}%</span>
                      </div>
                      <Progress 
                        value={allocation.percentage} 
                        className={`h-2 ${
                          allocation.name.includes("Deposito") ? "bg-dsm-blue" :
                          allocation.name.includes("Obligasi") ? "bg-dsm-teal" :
                          "bg-dsm-green"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Catatan Penting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm text-amber-800">
                      Profil risiko ini hanya sebagai panduan umum dan tidak menggantikan saran dari konsultan keuangan profesional. Keputusan investasi harus didasarkan pada situasi keuangan spesifik Anda.
                    </p>
                    <p className="text-sm text-amber-800">
                      Kami menyarankan untuk berkonsultasi dengan perencana keuangan sebelum membuat keputusan investasi.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RiskProfile;
