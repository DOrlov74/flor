import { Service } from "../models/Service";

export const services: Service[] = [
    {
        id: 'therapeutic',
        name: 'Massagem terapêutica',
        img: '../assets/back_opt.jpg',
        content: ['é uma massagem profunda, que promove o alivio de tensões que comprometem o bem estar do corpo. Esta massagem tem por finalidade reduzir a tensão muscular, causada muitas vezes pelo stress ou posturas incorretas que adquirimos no dia-a-dia.', 
            'Nessa massagem a pressão é direcionada a pontos específicos que desbloqueiam o fluxo energético de músculos, órgãos, nervos, vasos sanguíneos ou mesmo regiões inteiras comprometidas pelas contraturas, devolvendo ao organismo o suprimento energético que precisa para seu perfeito funcionamento.'],
        prices: [{address: 'Lisboa', price: 35}, {address: 'Alfragide', price: 45}],
        duration: 60
    },
    {
        id: 'ultrasonic',
        name: 'Tratamento terapêutico: massagem + ultrassons',
        img: '../assets/ultra_opt.jpg',
        content: ['é uma massagem profunda, que promove o alivio de tensões que comprometem o bem-estar do corpo. Esta massagem tem por finalidade reduzir a tensão muscular ou articular e deminuir a dor.'],
        list: ['Aplicação de calor para diminuir a dor, as aderências entre tecidos, os espasmos musculares para que a massagem não seja agressiva. ( 10 min)',
            'Fase de massagem que desbloqueia o fluxo energético de músculos, órgãos, nervos, vasos sanguíneos ou regiões inteiras comprometidas pelas contraturas, devolvendo ao organismo o suprimento energético que precisa para seu perfeito funcionamento. (45 min)',
            'Ultrassom vai estimular os músculos e articulações através das vibrações. Vai ajudar direcionar e relaxar as fibras do músculo contraído e drenar os resíduos (inflamação) depósitos. (7 min)'],
        prices: [{address: 'Lisboa', price: 35}, {address: 'Alfragide', price: 45}],
        duration: 60
    },
    {
        id: 'paraffin',
        name: 'Massagem braços e mãos 30 min + máscara de parafina 15min',
        img: '../assets/parafina_opt.jpg',
        content: ['Geralmente as mãos não são consideradas, por muitos, uma área com grande concentração de tensão. Também é uma região que possui pouca gordura, logo são as primeiras a enrugar e mostrar os sinais de envelhecimento.',
            'Nas atividades diárias ou o uso de força no punho com os movimentos de extensão, provoca maior sobrecarga no cotovelo do que com os movimentos de flexão. Este é um dos motivos que provoca a epicondilite.',
            'A massagem nas mãos e braços irá beneficiar a pele desta área, aumentar a temperatura dos tecidos, o fluxo sanguíneo que vai aumentar o rendimento das células a nutrição dos tecidos e facilitar o trabalho muscular e articular.',
            'A finalização com parafina diminui a rigidez das articulações e aumenta a amplitude de movimentos, faz as suas mãos suaves, descansadas e embelezadas.'],
        prices: [{address: 'Lisboa', price: 25}],
        duration: 45
    },
    {
        id: 'facial',
        name: 'Massagem facial: pack de 5 massagens',
        img: '../assets/facial_opt.jpg',
        content: ['A massagem facial dá à sua pele uma maior flexibilidade, dissolve os pontos de tensão, melhora o tônus muscular e ativa a circulação sanguínea. Pode ser usada para potencializar um tratamento de pele ou, simplesmente, para aliviar a expressão pesada e cansada.', 
            'Depois de 5 sessões com este tratamento com a frequência 3 vezes por semana, pode constatar melhorias, especialmente nas linhas de expressão. A estimulação e a microcirculação permitem ativar os fibroblastos, que aumentam a produção de colagénio e elastina que dão à pele uma aparência mais tonificada.'],
        prices: [{address: 'Lisboa', price: 125}],
        duration: 60
    },
    {
        id: 'radio',
        name: 'Massagem facial + radiofrequência',
        img: '../assets/radio_opt.jpg',
        content: ['Consiste no tratamento com a maquina de radiofrequência (15 min) e na massagem manual (60 min).',
            'A radiofrequência é um tratamento estético utilizado no combate à flacidez do rosto e pescoso, sendo muito eficaz para eliminar rugas, linhas de expressão e até mesmo a gordura localizada, sendo um método seguro com efeitos duradouros.',
            'O aparelho de radiofrequência eleva a temperatura da pele e do músculo, promovendo a contração do colagénio e favorecendo a produção de mais fibras de colagénio e elastina, dando mais sustentação e firmeza à pele. Os resultados podem ser observados nos primeiros dias logo após a primeira sessão e o resultado é progressivo, e por isso, quantos mais sessões fizer, maiores e melhores serão os resultados.'],
        prices: [{address: 'Lisboa', price: 35}],
        duration: 75
    },
    {
        id: 'presso',
        name: 'Pressoterapia: 1 zona: pernas / braços / barriga',
        img: '../assets/presso_opt.jpg',
        content: ['Para que a pressoterapia tenha melhores resultados antes de usar o equipamento a massagista faz drenagem linfática manual (cerca de 10 min), para que o procedimento seja realizado de forma mais eficiente.',
            'A pressoterapia é um tipo de drenagem linfática em que é utilizada um aparelho que parecem grandes botas que cobrem toda a perna, ou abdômen ou os braços. Nesse equipamento o ar enche essas \'botas\' o que pressiona as pernas de forma ritmada, o que permite mobilizar a linfa, desinchando a região. (30 min)'],
        prices: [{address: 'Lisboa', price: 20}],
        duration: 30
    },
]