import {NextRequest,NextResponse} from 'next/server';

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedServices=new Set(['Branding & strategy','Social media','Content creation','Video & motion','Websites & apps','Growth marketing','Custom digital solutions','Other']);
const clean=(value:unknown,max:number)=>typeof value==='string'?value.trim().slice(0,max):'';

export async function POST(request:NextRequest){
 let body:Record<string,unknown>;
 try{body=await request.json()}catch{return NextResponse.json({error:'Please check the form and try again.'},{status:400})}
 if(clean(body.website,200))return NextResponse.json({ok:true});
 const name=clean(body.name,100),email=clean(body.email,254),phone=clean(body.phone,60),brand=clean(body.brand,100),service=clean(body.service,80),message=clean(body.message,4000);
 if(name.length<2||!emailPattern.test(email)||!allowedServices.has(service)||message.length<15)return NextResponse.json({error:'Please add your name, a valid email, service and project details (15 characters minimum).'},{status:400});
 const apiKey=process.env.RESEND_API_KEY,from=process.env.RESEND_FROM_EMAIL;
 if(!apiKey||!from)return NextResponse.json({error:'The inquiry form is being connected. Please email pixelroar.cs@gmail.com for now.'},{status:503});
 const text=`New PixelRoar project inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone||'Not supplied'}\nBrand: ${brand||'Not supplied'}\nService: ${service}\n\nProject details:\n${message}`;
 try{
  const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:['pixelroar.cs@gmail.com'],reply_to:email,subject:`New project inquiry — ${brand||name}`,text}),cache:'no-store'});
  if(!result.ok)return NextResponse.json({error:'The message could not be sent right now. Please email pixelroar.cs@gmail.com.'},{status:502});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'The message could not be sent right now. Please email pixelroar.cs@gmail.com.'},{status:502})}
}
