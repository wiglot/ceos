import React from 'react';

const AboutMethodPage: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 shadow-xl rounded-lg prose prose-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-700 mb-4">
        O Método de Registro de Pensamento Disfuncional (RPD)
      </h1>

      <p>
        O Registro de Pensamento Disfuncional (RPD) é uma das técnicas centrais da Terapia Cognitivo-Comportamental (TCC). Ele funciona como uma ferramenta estruturada para ajudar você a identificar, analisar e reestruturar pensamentos que podem estar causando desconforto emocional e comportamentos indesejados.
      </p>

      <h2 className="text-2xl font-semibold text-sky-600 mt-6">
        Como Funciona?
      </h2>

      <p>
        A premissa básica da TCC é que não são as situações em si que nos afetam, mas sim a maneira como as interpretamos. Nossos pensamentos automáticos sobre um evento influenciam diretamente nossas emoções e comportamentos. Muitas vezes, esses pensamentos são distorcidos ou disfuncionais.
      </p>

      <p>
        O RPD guia você através de um processo passo a passo:
      </p>

      <ol className="list-decimal pl-5 space-y-2">
        <li><strong>Situação:</strong> Descrever objetivamente o evento que desencadeou o desconforto.</li>
        <li><strong>Emoções Iniciais:</strong> Identificar e dar uma nota para as emoções que você sentiu.</li>
        <li><strong>Pensamentos Automáticos:</strong> Anotar os pensamentos que passaram pela sua cabeça no momento.</li>
        <li><strong>Respostas Alternativas:</strong> Questionar seus pensamentos automáticos. Você buscará evidências a favor e contra, analisará a lógica e encontrará maneiras mais equilibradas e realistas de ver a situação.</li>
        <li><strong>Reavaliação:</strong> Após refletir, você reavalia suas emoções e a convicção nos pensamentos originais. A intensidade do desconforto geralmente diminui.</li>
      </ol>

      <h2 className="text-2xl font-semibold text-sky-600 mt-6">
        Quais são os Ganhos?
      </h2>

      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Autoconhecimento:</strong> Você se torna mais consciente dos seus padrões de pensamento e de como eles afetam suas emoções.</li>
        <li><strong>Redução do Sofrimento:</strong> Ao modificar pensamentos disfuncionais, a intensidade de emoções como ansiedade, tristeza e raiva tende a diminuir.</li>
        <li><strong>Resolução de Problemas:</strong> A técnica fortalece sua capacidade de analisar situações de forma mais clara e objetiva.</li>
        <li><strong>Empoderamento:</strong> Você aprende que tem a capacidade de influenciar suas próprias reações emocionais, o que é uma habilidade poderosa para a vida.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-sky-600 mt-6">
        Como Isso Pode Ajudar em uma Terapia?
      </h2>

      <p>
        Utilizar este aplicativo de RPD pode ser um complemento valioso para sua terapia. Levar seus registros para as sessões com seu psicólogo(a) pode:
      </p>

      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Acelerar o Processo:</strong> Fornece material rico e concreto para ser trabalhado na terapia, otimizando o tempo da sessão.</li>
        <li><strong>Facilitar a Comunicação:</strong> Ajuda a ilustrar para o terapeuta exatamente o que se passava em sua mente em momentos difíceis.</li>
        <li><strong>Praticar Habilidades:</strong> Permite que você pratique as habilidades aprendidas na terapia de forma consistente no seu dia a dia.</li>
      </ul>

      <p className="mt-6 border-t pt-4 text-sm text-gray-600">
        <strong>Lembre-se:</strong> Esta ferramenta é um auxílio para o autoconhecimento e desenvolvimento de habilidades, mas não substitui o acompanhamento de um profissional de saúde mental.
      </p>
    </div>
  );
};

export default AboutMethodPage; 