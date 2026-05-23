import { Link } from 'react-router';
import Button from '../components/ui/Button';
import SpeakerCard from '../components/ui/SpeakerCard';

export default function Seminar() {
   const speakers = [ 
  { id: 1, name: "Dery Agung Triyadi", role: "AWS Indonesia", img: "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png" }, 
  { id: 2, name: "Sowam Habibi", role: "Google Indonesia", img: "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png" }, 
  { id: 3, name: "Lhuqita Fazry", role: "Mobile Development Developer, Founder Rumah Coding Indonesia", img: "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png" }, 
  ];

  return (
    <div>
      <section
          id='seminar'
          className='py-10 flex gap-10 justify-between items-center'
        >
          <div className='w-1/3'>
            <img
              src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png"
              alt=""
            />
          </div>
          <div className='w-2/3 flex flex-col gap-6'>
            <h1 className='text-5xl text-pink-700 font-semibold'>IT Seminar</h1>
            <p className='text-sm md:text base lg:text-[1.35rem]'>
              Seminar Nasional Teknologi Informasi ini mengangkat tema <b>"Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif.”</b>Kami bertujuan untuk menggeser fokus dari ketakutan akan kompetisi menjadi eksplorasi peluang kolaborasi. Seminar ini akan mengupas tuntas bagaimana kita dapat merancang sistem, etika, dan lingkungan kerja di mana AI berfungsi sebagai mitra yang memperkuat kecerdasan, kreativitas, dan produktivitas manusia—bukan sebagai pengganti.
            </p>
            <div className='flex gap-3'> 
              <Link to="/register/event">
                <Button label="Daftar IT Seminar" variant="primary"/>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#FDF2F7] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-800 mb-6 uppercase tracking-wider">Tentang IT Seminar</h2>
          <p className="text-slate-700 leading-8 text-lg">
            Seminar bertajuk “Human-AI Integration: Merancang Arsitektur Kolaboratif, Di tengah pesatnya kemajuan kecerdasan buatan (AI), 
            narasi yang sering muncul adalah tentang persaingan antara manusia dan mesin. Kekhawatiran akan penggantian peran manusia oleh teknologi cerdas menjadi diskusi utama di berbagai sektor. 
            Namun, bagaimana jika kita mengubah paradigma tersebut? Seminar Nasional Teknologi Informasi ini hadir untuk menjawab tantangan itu dengan mengangkat 
            tema "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif.” 
            Kami bertujuan untuk menggeser fokus dari ketakutan akan kompetisi menjadi eksplorasi peluang kolaborasi. 
            Seminar ini akan mengupas tuntas bagaimana kita dapat merancang sistem, etika, dan lingkungan kerja di mana AI berfungsi 
            sebagai mitra yang memperkuat kecerdasan, kreativitas, dan produktivitas manusia—bukan sebagai pengganti.
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