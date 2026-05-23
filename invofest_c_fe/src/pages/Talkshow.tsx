import { Link } from "react-router";
import Button from "../components/ui/Button";
import SpeakerCard from "../components/ui/SpeakerCard";

export default function Talkshow() {
   const speakers = [ 
  { id: 1, name: "Dery Agung Triyadi", role: "AWS Indonesia", img: "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png" }, 
  { id: 2, name: "Sowam Habibi", role: "Google Indonesia", img: "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png" }, 
  { id: 3, name: "Lhuqita Fazry", role: "Mobile Development Developer, Founder Rumah Coding Indonesia", img: "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png" }, 
  ];
  return (
    <div>
      <section
        id='talkshow'
        className='py-10 flex gap-10 justify-between items-center'
      >
      <div className='w-2/3 flex flex-col gap-6'>
        <h1 className='text-5xl text-pink-700 font-semibold'>IT Talkshow</h1>
          <p className='text-sm md:text base lg:text-[1.35rem]'>
            Talkshow berskala nasional: “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan.” Acara ini dirancang bukan untuk membahas teknologi sebagai entitas yang dingin dan terpisah, melainkan untuk menggali bagaimana kita dapat menanamkan nilai-nilai kemanusiaan—seperti empati, etika, dan kreativitas—ke dalam inti pengembangan AI. Kami akan mengupas tuntas visi masa depan di mana AI tidak menjadi pesaing, tetapi menjadi mitra kolaboratif yang memperkuat potensi unik manusia. Talkshow ini bertujuan untuk menginspirasi generasi muda dan para penggiat teknologi untuk tidak hanya menjadi pengguna, tetapi juga menjadi arsitek masa depan digital yang lebih manusiawi. Mari bergabung untuk meningkatkan pengetahuan, mengembangkan potensi diri, dan menjadi bagian dari dialog penting dalam membentuk era kolaborasi manusia dan AI.
          </p>
          <div className='flex gap-3'> 
            <Link to="/register/event">
              <Button label="Daftar IT Talkshow" variant="primary"/>
            </Link>
          </div>
          </div>
            <div className='w-1/3'>
              <img
                src="https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png"
                alt=""
              />
            </div>
        </section>

        <section className="w-full bg-[#FDF2F7] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-800 mb-6 uppercase tracking-wider">Tentang IT Talkshow</h2>
          <p className="text-slate-700 leading-8 text-lg">
           Seiring teknologi, khususnya kecerdasan buatan (AI), yang semakin meresap ke dalam setiap aspek kehidupan kita, 
           muncul sebuah pertanyaan fundamental: Apakah kita sedang menciptakan teknologi yang melayani manusia, atau justru sebaliknya? 
           Untuk menjawab pertanyaan tersebut, kami mempersembahkan talkshow berskala nasional: “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan.” 
           Acara ini dirancang bukan untuk membahas teknologi sebagai entitas yang dingin dan terpisah, melainkan untuk menggali bagaimana kita dapat menanamkan 
           nilai-nilai kemanusiaan—seperti empati, etika, dan kreativitas—ke dalam inti pengembangan AI. Kami akan mengupas tuntas visi masa depan 
           di mana AI tidak menjadi pesaing, tetapi menjadi mitra kolaboratif yang memperkuat potensi unik manusia.
          </p>
        </div>
      </section>    

    <section
        id='speaker'
        className='py-24'>
          <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-800 mb-20 uppercase tracking-wider">Temui Pembicara Khusus Kami</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-3 w-full'>
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={index}
                name={speaker.name}
                role={speaker.role}
                imageUrl={speaker.img}
              />
            ))}
          </div>
        </section>
    </div>
  );
}