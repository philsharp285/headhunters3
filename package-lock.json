import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C } from "../data";
import { BackBtn, Btn, GoldBtn } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function QuizPage() {
  const navigate = useNavigate();
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});

  useEffect(() => {
    document.title = "Do I Need a Headhunter? | headhunters.co.uk";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Quiz", url: "https://headhunters.co.uk/quiz" }
    ]));
    return cleanup;
  }, []);

  const questions=[
    {q:"What is the seniority level of this role?",opts:[{t:"Director level or above",pts:3},{t:"Senior Manager",pts:2},{t:"Manager or below",pts:0}]},
    {q:"How critical is confidentiality?",opts:[{t:"Essential - cannot advertise publicly",pts:3},{t:"Important but not critical",pts:2},{t:"Not a major concern",pts:0}]},
    {q:"Have you previously advertised this role?",opts:[{t:"Yes, and it didn't work",pts:3},{t:"No, this is the first attempt",pts:1},{t:"Yes, and we got good candidates",pts:0}]},
    {q:"What is the cost of getting this hire wrong?",opts:[{t:"Very high - strategic impact",pts:3},{t:"Moderate - operational impact",pts:2},{t:"Low - easily reversible",pts:0}]},
    {q:"Are the best candidates likely to be actively looking?",opts:[{t:"No - they're passive/employed",pts:3},{t:"Mixed - some active, some passive",pts:2},{t:"Yes - active job seekers",pts:0}]}
  ];

  const ans=(pts)=>{setAnswers({...answers,[step]:pts});setStep(step+1);};
  const total=Object.values(answers).reduce((a,b)=>a+b,0);
  const complete=step>=questions.length;

  const getRecommendation=()=>{
    if(total>=10)return {rec:"Strong Yes",msg:"Your situation is exactly what retained executive search is designed for. The combination of seniority, confidentiality requirements, and the passive nature of the best candidates makes a headhunter the clear choice.",color:C.ok};
    if(total>=6)return {rec:"Probably Yes",msg:"Several factors suggest a headhunter would deliver better results than advertising alone. Consider a retained search or at minimum a hybrid model.",color:C.accent};
    if(total>=3)return {rec:"Consider It",msg:"A headhunter could add value, but advertising-first might be a reasonable starting point. If advertising doesn't work within 4–6 weeks, engage a headhunter.",color:C.gold};
    return {rec:"Probably Not",msg:"Your role characteristics suggest conventional recruitment channels may be sufficient. Save retained search fees for more senior or strategic appointments.",color:C.tl};
  };

  const result=complete?getRecommendation():null;

  return <div style={{padding:"60px 20px 80px",maxWidth:700,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>navigate("/")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:48,marginBottom:12}}>🎯</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>Do I Need a Headhunter?</h1>
      <p style={{fontSize:15,color:C.tl}}>Answer 5 questions to find out if retained executive search is right for your role.</p>
    </div>

    {!complete&&<div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
      <div style={{fontSize:13,color:C.tl,fontWeight:600,marginBottom:8}}>Question {step+1} of {questions.length}</div>
      <div style={{height:6,background:C.bl,borderRadius:3,marginBottom:24}}>
        <div style={{height:6,background:C.accent,borderRadius:3,width:`${((step+1)/questions.length)*100}%`,transition:"width 0.3s"}}/>
      </div>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 24px"}}>{questions[step].q}</h2>
      <div style={{display:"grid",gap:12}}>
        {questions[step].opts.map((o,i)=><div key={i} onClick={()=>ans(o.pts)} style={{padding:16,border:`2px solid ${C.bd}`,borderRadius:8,cursor:"pointer",transition:"all 0.2s",background:C.bg}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.background=C.card;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bd;e.currentTarget.style.background=C.bg;}}>
          <div style={{fontSize:15,fontWeight:600,color:C.tx}}>{o.t}</div>
        </div>)}
      </div>
    </div>}

    {complete&&result&&<>
      <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:16}}>✓</div>
          <div style={{fontSize:14,color:C.tl,marginBottom:8}}>Your Score: {total} / 15</div>
          <h2 style={{fontSize:32,fontWeight:800,color:result.color,margin:"0 0 16px"}}>{result.rec}</h2>
          <p style={{fontSize:16,lineHeight:1.6,color:C.tx,margin:0}}>{result.msg}</p>
        </div>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <Btn onClick={()=>{setStep(0);setAnswers({});}}>Retake Quiz</Btn>
          <GoldBtn onClick={()=>navigate("/contact")}>Brief a Headhunter →</GoldBtn>
        </div>
      </div>
      <EnquiryBox
        title="Ready to discuss your requirements?"
        subtitle="Get personalized advice based on your specific hiring needs"
        buttonText="Get Expert Help"
        context={`Quiz result: ${result.rec} (Score: ${total}/15)`}
      />
    </>}
  </div>;
}
