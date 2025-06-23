import { Emotion } from './types';

export const PLUTCHIK_EMOTIONS_DEFINITIONS: Emotion[] = [
  // Alegria (Yellow)
  { id: 'alegria_serenidade', name: 'Serenidade', baseEmotion: 'Alegria', intensityLevel: 1, color: '#FFFFBF', definition: 'Um estado de calma e paz interior. É a forma mais branda de alegria, associada à tranquilidade.\n\n<i>"Senti uma serenidade imensa ao sentar à beira do lago ao amanhecer, com o mundo ainda em silêncio. Nada precisava ser feito, apenas ser."</i>' },
  { id: 'alegria_alegria', name: 'Alegria', baseEmotion: 'Alegria', intensityLevel: 2, color: '#FFFF7F', definition: 'Sentimento de contentamento e satisfação. Mais intensa que a serenidade, envolve otimismo e bom humor.\n\n<i>"Receber a notícia da aprovação do meu projeto me encheu de alegria; eu não conseguia parar de sorrir e compartilhar com todos."</i>' },
  { id: 'alegria_extasia', name: 'Êxtase', baseEmotion: 'Alegria', intensityLevel: 3, color: '#FFFF00', definition: 'Uma alegria avassaladora e eufórica. É o pico da felicidade, um sentimento de prazer e excitação extremos.\n\n<i>"Como a Elizabeth Bennet, de Orgulho e Preconceito, ao finalmente se unir ao Sr. Darcy, senti um êxtase que parecia dissolver todas as dificuldades passadas em pura felicidade."</i>' },

  // Confiança (Light Green)
  { id: 'confianca_aprovacao', name: 'Aprovação', baseEmotion: 'Confiança', intensityLevel: 1, color: '#BFFFBF', definition: 'Sentimento de aceitação ou consentimento. Relaciona-se a sentir-se validado por outros.\n\n<i>"Quando meu chefe elogiou meu relatório na frente da equipe, senti uma onda de aprovação que me deu mais segurança no meu trabalho."</i>' },
  { id: 'confianca_confianca', name: 'Confiança', baseEmotion: 'Confiança', intensityLevel: 2, color: '#7FFF7F', definition: 'Crença na própria capacidade ou na de outra pessoa. Envolve segurança e certeza.\n\n<i>"Apesar do desafio, eu tinha confiança de que conseguiria terminar a maratona. Treinei por meses e acreditava na minha força."</i>' },
  { id: 'confianca_admiracao', name: 'Admiração', baseEmotion: 'Confiança', intensityLevel: 3, color: '#00FF00', definition: 'Um profundo sentimento de respeito e apreço. É a confiança elevada a um nível de veneração.\n\n<i>"Observar a forma como Marie Curie dedicou sua vida à ciência, superando tantos obstáculos, me enche de admiração por sua coragem e intelecto."</i>' },

  // Medo (Dark Green)
  { id: 'medo_apreensao', name: 'Apreensão', baseEmotion: 'Medo', intensityLevel: 1, color: '#99CC99', definition: 'Uma sensação de ansiedade ou temor sobre o futuro. É um medo leve, uma preocupação com o que pode acontecer.\n\n<i>"Eu estava apreensivo antes da entrevista de emprego, imaginando todas as perguntas difíceis que poderiam me fazer."</i>' },
  { id: 'medo_medo', name: 'Medo', baseEmotion: 'Medo', intensityLevel: 2, color: '#008000', definition: 'Uma emoção desagradável causada pela crença de que algo ou alguém é perigoso, provável de causar dor ou uma ameaça.\n\n<i>"Senti um medo paralisante ao ouvir passos no andar de baixo durante a noite, com o coração batendo descontroladamente."</i>' },
  { id: 'medo_terror', name: 'Terror', baseEmotion: 'Medo', intensityLevel: 3, color: '#006600', definition: 'Medo extremo e avassalador. Causa uma sensação de impotência e pânico intenso.\n\n<i>"Como Frodo diante do Olho de Sauron, um terror puro e primitivo tomou conta de mim, uma certeza de que o mal estava perto demais."</i>' },

  // Surpresa (Cyan)
  { id: 'surpresa_distracao', name: 'Distração', baseEmotion: 'Surpresa', intensityLevel: 1, color: '#BFFFFF', definition: 'Estado de ter a atenção desviada. Uma forma leve de surpresa que quebra o foco.\n\n<i>"Eu estava tentando ler, mas a distração com a música alta do vizinho me impedia de focar em uma única frase."</i>' },
  { id: 'surpresa_surpresa', name: 'Surpresa', baseEmotion: 'Surpresa', intensityLevel: 2, color: '#7FFFFF', definition: 'Sentimento causado por algo inesperado. Pode ser positivo, negativo ou neutro.\n\n<i>"Minha família organizou uma festa de aniversário sem que eu soubesse. Ao entrar em casa, a surpresa foi tão grande que fiquei sem palavras."</i>' },
  { id: 'surpresa_assombro', name: 'Assombro', baseEmotion: 'Surpresa', intensityLevel: 3, color: '#00DDDD', definition: 'Uma surpresa tão intensa que causa espanto e admiração, muitas vezes misturada com um pouco de medo.\n\n<i>"Ver a aurora boreal pela primeira vez me deixou em estado de assombro. As cores dançando no céu eram de uma beleza de outro mundo."</i>' },

  // Tristeza (Blue)
  { id: 'tristeza_abatimento', name: 'Abatimento', baseEmotion: 'Tristeza', intensityLevel: 1, color: '#BFBFFF', definition: 'Sentimento de desânimo e melancolia. Uma tristeza leve, muitas vezes ligada à decepção.\n\n<i>"Depois de receber o resultado negativo, senti um forte abatimento e perdi a vontade de sair de casa por um tempo."</i>' },
  { id: 'tristeza_tristeza', name: 'Tristeza', baseEmotion: 'Tristeza', intensityLevel: 2, color: '#7F7FFF', definition: 'Sentimento de dor emocional, infelicidade e desamparo, geralmente causado por uma perda.\n\n<i>"A morte do meu animal de estimação me deixou com uma tristeza profunda. A casa parecia vazia e silenciosa sem ele."</i>' },
  { id: 'tristeza_angustia', name: 'Angústia', baseEmotion: 'Tristeza', intensityLevel: 3, color: '#0000CC', definition: 'Um sofrimento profundo e opressivo. É uma tristeza intensa que parece não ter saída, causando aflição.\n\n<i>"Raskólnikov, de Crime e Castigo, vivia em constante angústia após seu ato, um peso na alma que o consumia dia e noite."</i>' },

  // Nojo (Magenta/Pink)
  { id: 'nojo_tedio', name: 'Tédio', baseEmotion: 'Nojo', intensityLevel: 1, color: '#FFCCFF', definition: 'Sentimento de desinteresse e enfado. Uma forma branda de aversão a uma situação ou atividade.\n\n<i>"A palestra era tão monótona que o tédio tomou conta da sala; todos olhavam para o relógio, esperando que acabasse."</i>' },
  { id: 'nojo_nojo', name: 'Nojo', baseEmotion: 'Nojo', intensityLevel: 2, color: '#FF99FF', definition: 'Uma forte aversão ou repulsa a algo considerado ofensivo, sujo ou desagradável.\n\n<i>"Senti um nojo imediato ao ver a comida estragada na geladeira, um impulso de me afastar e fechar a porta."</i>' },
  { id: 'nojo_repugnancia', name: 'Repugnância', baseEmotion: 'Nojo', intensityLevel: 3, color: '#FF00FF', definition: 'Aversão extrema e visceral. É o nível mais alto de nojo, uma repulsa profunda.\n\n<i>"A crueldade descrita no livro me causou uma repugnância tão forte que precisei parar de ler. Era uma aversão moral àquela violência."</i>' },

  // Raiva (Red)
  { id: 'raiva_aborrecimento', name: 'Aborrecimento', baseEmotion: 'Raiva', intensityLevel: 1, color: '#FFBFBF', definition: 'Um sentimento de irritação ou incômodo leve. É a forma mais branda da raiva.\n\n<i>"Fiquei com um certo aborrecimento ao perceber que o ônibus estava atrasado de novo, estragando meus planos para o início da manhã."</i>' },
  { id: 'raiva_irritacao', name: 'Irritação', baseEmotion: 'Raiva', intensityLevel: 2, color: '#FF7F7F', definition: 'Um estado de agitação e impaciência. Mais forte que o aborrecimento, mas menos intenso que a ira.\n\n<i>"A constante interrupção durante a reunião me deixou com uma irritação crescente, tornando difícil manter a calma e o foco."</i>' },
  { id: 'raiva_ira', name: 'Ira', baseEmotion: 'Raiva', intensityLevel: 3, color: '#DD0000', definition: 'Raiva intensa e descontrolada. Um forte sentimento de hostilidade e antagonismo.\n\n<i>"Como Aquiles na Ilíada, a traição que sofreu o encheu de uma ira avassaladora, um desejo ardente por retribuição que nublou seu julgamento."</i>' },

  // Antecipação (Orange)
  { id: 'antecipacao_interesse', name: 'Interesse', baseEmotion: 'Antecipação', intensityLevel: 1, color: '#FFDFBF', definition: 'Sentimento de curiosidade ou atenção em relação a algo. É uma antecipação branda e positiva.\n\n<i>"A sinopse do filme despertou meu interesse, e agora estou curioso para saber como a história se desenrola."</i>' },
  { id: 'antecipacao_antecipacao', name: 'Antecipação', baseEmotion: 'Antecipação', intensityLevel: 2, color: '#FFC27F', definition: 'Ação de esperar por algo que vai acontecer. Envolve expectativa e preparação.\n\n<i>"Na semana antes da viagem, eu sentia uma forte antecipação, planejando os roteiros e imaginando os lugares que visitaria."</i>' },
  { id: 'antecipacao_vigilancia', name: 'Vigilância', baseEmotion: 'Antecipação', intensityLevel: 3, color: '#FF6600', definition: 'Estado de atenção e prontidão intensas para detectar perigos ou oportunidades. É uma antecipação alerta.\n\n<i>"O guarda noturno mantinha um estado de vigilância constante, atento a qualquer som ou movimento suspeito no perímetro."</i>' },
];

// Order of petals, clockwise starting from top
export const PLUTCHIK_BASE_EMOTIONS_ORDER = [
  'Alegria', 'Confiança', 'Medo', 'Surpresa', 'Tristeza', 'Nojo', 'Raiva', 'Antecipação'
];

// Radii for the different intensity levels of Plutchik's wheel
export const PLUTCHIK_RADII = {
  intensity1: 150, // Outermost (e.g., Serenidade)
  intensity2: 100, // Middle (e.g., Alegria)
  intensity3: 50,  // Innermost (e.g., Êxtase)
  centerCircle: 25 // Radius for the central text display circle
};

export const SVG_VIEWBOX_SIZE = PLUTCHIK_RADII.intensity1 * 2 + 20; // +20 for padding/stroke
export const SVG_CENTER = SVG_VIEWBOX_SIZE / 2;
