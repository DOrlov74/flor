import { Service } from "../models/Service";
import therapeutic from '../assets/back_opt.jpg';
import ultrasonic from '../assets/ultra_opt.jpg';
import paraffin from '../assets/parafina_opt.jpg';
import facial from '../assets/facial_opt.jpg';
import radio from '../assets/radio_opt.jpg';
import presso from '../assets/presso_opt.jpg';

export const images = {
    'therapeutic': therapeutic, 
    'ultrasonic': ultrasonic,
    'paraffin': paraffin,
    'facial': facial,
    'radio': radio,
    'presso': presso
};

export const services: Service[] = [
    {
        id: 'therapeutic',
        name: 'Massagem terapêutica / desportiva',
        enName: 'Therapeutic / sport massage',
        img: '../assets/back_opt.jpg',
        content: ['é uma massagem profunda, que promove o alivio de tensões que comprometem o bem estar do corpo. Esta massagem tem por finalidade reduzir a tensão muscular, causada muitas vezes pelo stress ou posturas incorretas que adquirimos no dia-a-dia.', 
            'Nessa massagem a pressão é direcionada a pontos específicos que desbloqueiam o fluxo energético de músculos, órgãos, nervos, vasos sanguíneos ou mesmo regiões inteiras comprometidas pelas contraturas, devolvendo ao organismo o suprimento energético que precisa para seu perfeito funcionamento.'],
        enContent: ['it\'s a deep massage, that promotes stress relief and the well-being of the body. This massage aims to reduce muscle tension, often caused by stress or incorrect postures that we acquire in everyday life.', 
            'In this massage the pressure is directed to specific points that unblock the energy flow of muscles, organs, nerves, blood vessels or even entire regions, compromised by contractures, returning to the organism the energy supply it needs for its perfect functioning.'],
        prices: [{address: 'Lisboa', price: 40}, {address: 'Alfragide', price: 0}],
        duration: 60
    },
    {
        id: 'ultrasonic',
        name: 'Tratamento fisioterapêutico da dor ( quick massagem) 20 min/ uma zona + ultrassom',
        enName: 'Physiotherapeutic pain treatment (quick massage) 20 min/ one zone + ultrasound',
        img: '../assets/ultra_opt.jpg',
        content: ['é uma massagem profunda, que promove o alivio de tensões que comprometem o bem-estar do corpo. Esta massagem tem por finalidade reduce muscle or joint tension and lessen pain.'],
        enContent: ['it\'s a deep massage, that promotes stress relief and the well-being of the body. This massage aims to reduce muscle tension ou articular e deminuir a dor.'],
        list: ['Aplicação de calor para diminuir a dor, as aderências entre tecidos, os espasmos musculares para que a massagem não seja agressiva. ( 10 min)',
            'Fase de massagem que desbloqueia o fluxo energético de músculos, órgãos, nervos, vasos sanguíneos ou regiões inteiras comprometidas pelas contraturas, devolvendo ao organismo o suprimento energético que precisa para seu perfeito funcionamento. (45 min)',
            'Ultrassom vai estimular os músculos e articulações através das vibrações. Vai ajudar direcionar e relaxar as fibras do músculo contraído e drenar os resíduos (inflamação) depósitos. (7 min)'],
        enList: ['Applying heat to lessen pain, adhesions between tissues, muscle spasms helps the massage not to be aggressive. ( 10 min)',
            'Massage phase that unblocks the energy flow of muscles, organs, nerves, blood vessels, or entire regions compromised by contractures, returning to the organism the energy supply it needs for its perfect functioning. (45 min)',
            'Ultrasound will stimulate muscles and joints through vibrations. It will help find and relax the contracted muscle fibers and drain waste (inflammation) deposits. (7 min)'],
        prices: [{address: 'Lisboa', price: 25}],
        duration: 30
    },
    {
        id: 'paraffin',
        name: 'Massagem braços e mãos 20 min + máscara de parafina 15min',
        enName: 'Arm and hand massage 20 min + paraffin mask 15min',
        img: '../assets/parafina_opt.jpg',
        content: ['Geralmente as mãos não são consideradas, por muitos, uma área com grande concentração de tensão. Também é uma região que possui pouca gordura, logo são as primeiras a enrugar e mostrar os sinais de envelhecimento.',
            'Nas atividades diárias ou o uso de força no punho com os movimentos de extensão, provoca maior sobrecarga no cotovelo do que com os movimentos de flexão. Este é um dos motivos que provoca a epicondilite.',
            'A massagem nas mãos e braços irá beneficiar a pele desta área, aumentar a temperatura dos tecidos, o fluxo sanguíneo que vai aumentar o rendimento das células, a nutrição dos tecidos e facilitar o trabalho muscular e articular.',
            'A finalização com parafina diminui a rigidez das articulações e aumenta a amplitude de movimentos, faz as suas mãos suaves, descansadas e embelezadas.'],
        enContent: ['Hands are generally not considered, by many, an area with a high concentration of stress. It is also a region that has little fat, soon they are the first to wrinkle and show the signs of aging.',
            'In daily activities or using wrist strength with extension movements, causes greater overload on the elbow than with flexion movements. This is one of the reasons that causes epicondylitis.',
            'Hand and arm massage will benefit the skin in this area, raise tissue temperature, blood flow that will increase the cell profit, tissue nutrition and facilitate muscle and joint work.',
            'Finishing with paraffin decreases joint stiffness and increases range of motion, makes your hands smooth, rested and beautified.'],
        prices: [{address: 'Lisboa', price: 25}],
        duration: 45
    },
    {
        id: 'facial',
        name: 'Massagem facial',
        enName: 'Facial massage',
        img: '../assets/facial_opt.jpg',
        content: ['A massagem facial dá à sua pele uma maior flexibilidade, dissolve os pontos de tensão, melhora o tônus muscular e ativa a circulação sanguínea. Pode ser usada para potencializar um tratamento de pele ou, simplesmente, para aliviar a expressão pesada e cansada.', 
            'Depois de 5 sessões com este tratamento com a frequência 3 vezes por semana, pode constatar melhorias, especialmente nas linhas de expressão. A estimulação e a microcirculação permitem ativar os fibroblastos, que aumentam a produção de colagénio e elastina que dão à pele uma aparência mais tonificada.'],
        enContent: ['Facial massage gives your skin greater flexibility, dissolves tension points, improves muscle tone and activates blood circulation. Can be used to enhance a skin treatment or, simply, to remove heavy and tired look.', 
            'After 5 sessions with this treatment with the frequency of 3 times a week, can see improvements, especially on the mimic wrinkles. Stimulation and microcirculation enable fibroblasts to be activated, that increase the production of collagen and elastin that give the skin a more toned appearance.'],
        prices: [{address: 'Lisboa', price: 40}],
        duration: 60
    },
    {
        id: 'radio',
        name: 'Massagem facial + radiofrequência',
        enName: 'Facial massage + radio frequency',
        img: '../assets/radio_opt.jpg',
        content: ['Consiste no tratamento com a maquina de radiofrequência (15 min) e na massagem manual (60 min).',
            'A radiofrequência é um tratamento estético utilizado no combate à flacidez do rosto e pescoso, sendo muito eficaz para eliminar rugas, linhas de expressão e até mesmo a gordura localizada, sendo um método seguro com efeitos duradouros.',
            'O aparelho de radiofrequência eleva a temperatura da pele e do músculo, promovendo a contração do colagénio e favorecendo a produção de mais fibras de colagénio e elastina, dando mais sustentação e firmeza à pele. Os resultados podem ser observados nos primeiros dias logo após a primeira sessão e o resultado é progressivo, e por isso, quantos mais sessões fizer, maiores e melhores serão os resultados.'],
        enContent: ['It consists of treatment with the radiofrequency machine (15 min) and hand massage (60 min).',
            'Radiofrequency is an aesthetic treatment used to combat sagging of the face and neck, being very effective to eliminate wrinkles, expression lines and even localized fat, being a safe method with lasting effects.',
            'The radiofrequency device raises the temperature of the skin and muscle, promoting collagen contraction and favoring the production of more collagen and elastin fibers, giving more support and firmness to the skin. Results can be seen within the first few days right after the first session and the result is progressive, and therefore, the more sessions you do, the bigger and better the results will be.'],
        prices: [{address: 'Lisboa', price: 40}],
        duration: 60
    },
    {
        id: 'presso',
        name: 'Pressoterapia: 1 zona: pernas / braços / barriga',
        enName: 'Pressotherapy: 1 zone: legs / arms / belly',
        img: '../assets/presso_opt.jpg',
        content: ['Para que a pressoterapia tenha melhores resultados antes de usar o equipamento a massagista faz drenagem linfática manual (cerca de 10 min), para que o procedimento seja realizado de forma mais eficiente.',
            'A pressoterapia é um tipo de drenagem linfática em que é utilizada um aparelho que parecem grandes botas que cobrem toda a perna, ou abdômen ou os braços. Nesse equipamento o ar enche essas \'botas\' o que pressiona as pernas de forma ritmada, o que permite mobilizar a linfa, desinchando a região. (30 min)'],
        enContent: ['For pressotherapy to have better results before using the equipment the masseuse does manual lymphatic drainage (about 10 min), for the procedure to be carried out more efficiently.',
            'Pressotherapy is a type of lymphatic drainage in which a device that looks like big boots is used that cover the entire leg or abdomen or the arms. In this equipment, the air fills these \'boots\' what presses the legs rhythmically, which allows to mobilize the lymph, deflating the region. (30 min)'],
        prices: [{address: 'Lisboa', price: 25}],
        duration: 30
    },
]