import { Post } from "../models/Post";
import avatar from "../assets/avatar.png";
import avatar2 from "../assets/avatar2.png";

export const news: Post[]=[
    {
    id: '1',
    date: '2022-04-14',
    author: {id: 'ae45R0bTxxS5DCDaOSs66I2ZbU63', displayName: 'Admin', photoURL: avatar2},
    title: 'Início do "flormassagem.ml"',
    enTitle: 'begin of "flormassagem.ml"',
    content: ['O nosso site começa a funcionar no enderesso "flormassagem.ml"'],
    enContent: ['Our site begin to work on "flormassagem.ml" address'],
    likes: 0
},
{
    id: '2',
    date: '2022-06-05',
    author: {id: 'NsnGuOMC7yQMjxIwGWVaFYB4bCL2', displayName: 'Vitória', photoURL: avatar},
    title: 'Fadiga Muscular: o que fazer?',
    enTitle: 'Muscle Fatigue: what to do?',
    content: ['Trabalhas no escritório? Passas muito tempo a conduzir?', 
        'Tens espasmos musculares ou tremores?',
        'Tens cãibras musculares por excesso de atividade física?',
        'Adoras correr? Voltaste recentemente de férias, mas continuas cansado?',
        'Tenho uma resolução!',
        'Marca uma massagem comigo!',
        'Massagem vai ajudar na recuperação muscular e relaxa o corpo!'],
    enContent: ['Do you work in the office? Do you spend a lot of time driving?', 
        'Do you have muscle spasms or tremors?',
        'Do you have muscle cramps from excessive physical activity?',
        'Do you love to run? Have you recently returned from vacation, but are you still tired?',
        'I have an answer!',
        'Book a massage with me!',
        'Massage will help in muscle recovery and to relax the body!'],
    likes: 1
}
]