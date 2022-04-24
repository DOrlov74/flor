import { Box, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { LangContext } from "../components/LanguageProvider";
import { containerStyle } from "../theme/styles";

export default function Privacy(){
    const {language}=useContext(LangContext);
    
    return(
        <Box component="div"
            sx={containerStyle}>
            <Paper sx={{maxWidth: 'md', p: '1rem'}}>
                <Typography gutterBottom variant="h5" sx={{pb: 2}}>
                    {language ? 'Política de privacidade' : 'Privacy policy'}
                </Typography>
                <Typography variant="h6" >
                    {language ? 'Geral' : 'General'}
                </Typography>
                <Typography variant="body2">
                    Agradecemos a visita ao nosso web site e pelo interesse que demonstra pelos nossos serviços.
Poderá visitar o nosso website sem ter de partilhar connosco qualquer das suas informações pessoais. Só necessitaremos dos seus dados se pretender usufruir de determinados serviços.
Com esta declaração de proteção de dados pretendemos indicar, com toda a transparência, quais os dados que pedimos, processamos e armazenamos e para que fim.
Esta declaração diz respeito às nossas práticas de privacidade relacionadas com este web site.
A nossa equipa respeita o seu direito à privacidade e não recolhe neste site qualquer informação pessoal sobre si sem o seu consentimento.
Quaisquer dados pessoais que nos forneça serão tratados com as garantias de segurança e confidencialidade, exigidas pela Lei de Proteção de Dados em vigor.
                </Typography>
                <Typography variant="h6" >
                    {language ? 'Recolha, processamento e uso de dados pessoais' : 'Collection, processing and use of personal data'}
                </Typography>
                <Typography variant="body2">
                    A nossa equipa não recolhe os seus dados pessoais neste web site, a menos que voluntariamente os forneça (por exemplo, quando utiliza o nosso formulário online para nos dirigir um pedido de informação, marcação de massagem, etc.).
Qualquer informação que nos forneça por esta via será apenas utilizada pela nossa equipa para a finalidade descrita, ou seja, prestar informações relativas aos nossos serviços e outras operações conexas com essa actividade.
Os seus dados pessoais não serão tratados nem revelados sem o seu consentimento, nos termos da lei atualmente em vigor.<br/>
Para que possamos prestar-lhe os serviços pretendidos precisamos de recolher dados pessoais, como o nome, o número de telefone, o e-mail, etc. Estes dados pessoais só são recolhidos e utilizados por nós na medida do que for necessário para a prestação do respetivo serviço.
                </Typography>
                <Typography variant="h6" >
                    {language ? 'Consentimento' : 'Agreement'}
                </Typography>
                <Typography variant="body2">
                   Este Site foi criado e funciona em conformidade com a lei portuguesa.
O acesso ao site pressupõe que o utilizador declara ter lido, compreendido e aceite o Aviso Legal acima descrito.
Ao aceder e utilizar este web site, o utilizador concorda expressamente com os termos desta Política de Privacidade; caso não concorde com qualquer dos termos desta, não deverá usar o site nem fornecer os seus dados pessoais.
                </Typography>
            </Paper>
        </Box>
    );
}