//selecting all required elements
const start_btn_home = document.querySelector(".start_btn");
const start_btn = document.querySelector(".start_btn #button_play");
const info_box = document.querySelector(".info_box");
const highscores = document.querySelector("#highscores");
const scoreTextPoint = document.getElementById("score");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

const loader = document.getElementById("loader");
loader.classList.add("hidden");

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  
  info_box.classList.remove("activeInfo"); //hide info box
  start_btn_home.classList.add("hidden");

  loader.classList.remove("hidden");
  const myTimeout = setTimeout(startQuiz, 3000);

  function startQuiz() {    
    loader.classList.add("hidden");
    start_btn_home.classList.remove("hidden");
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
  }
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  localStorage.setItem("mostRecentScore", userScore); /*go to the end page*/
  return window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLSc3EbmipL8vlhBPbHF4elNblaHUIBGr5iHgzP0-w4LlXIaWvA/viewform");
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  localStorage.setItem("mostRecentScore", userScore); /*go to the end page*/
  return window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLSc3EbmipL8vlhBPbHF4elNblaHUIBGr5iHgzP0-w4LlXIaWvA/viewform");
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    next_btn.classList.remove("show"); //hide the next button
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};

let countA = 0;
let countB = 0;
let countC = 0;
let countD = 0;

// getting questions and options from array
function showQuetions(index) {
  loader.classList.add("hidden");
  const que_text = document.querySelector(".que_text");
  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;

  let option_tag = '';
  const prefixes = ['A', 'B', 'C', 'D'];
  questions[index].options.forEach((option, idx) => {
    option_tag += `
      <div class="option" data-choice="${prefixes[idx]}">
        <p class="choice-prefix">${prefixes[idx]}</p>
        <p class="choice-text" data-number="${idx + 1}">
          <span class="question">${option}</span>
        </p>
      </div>
    `;
  });
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  let choice = answer.getAttribute("data-choice");

  // Incrementa o contador da opção selecionada
  switch (choice) {
    case 'A':
      countA++;
      break;
    case 'B':
      countB++;
      break;
    case 'C':
      countC++;
      break;
    case 'D':
      countD++;
      break;
  }

  // Desabilita todas as opções após uma seleção
  const options = option_list.querySelectorAll(".option");
  options.forEach(opt => {
    opt.classList.add("disabled");
  });

  // Mostra o botão para próxima questão
  next_btn.classList.add("show");

  // Exibe o número de cliques para o usuário
  console.log(`Total de cliques: A = ${countA}, B = ${countB}, C = ${countC}, D = ${countD}`);
}

function showResult() {
  info_box.classList.remove("activeInfo"); 
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");
  if (countA > countB && countA > countC && countA > countD) {
    let scoreTag =
   `
      <span>Que legal 😎, você se encaixa com o Perfil A!</span>
      <p>Isso significa que você tende a ser uma pessoa <strong>direta</strong>, <strong>ousada</strong> e <strong>enérgica</strong> ⚡, alguém que não tem medo de assumir riscos.</p>
      <br/>
      <p>Para canalizar essa energia, recomendamos que você explore cursos na área de comunicação 🗣️, onde suas habilidades podem realmente brilhar:</p>
      <a href="https://www.alura.com.br/curso-online-comunicacao-se-expressar-bem-ser-compreendido?utm_term=&utm_campaign=&utm_source=adwords&utm_medium=ppc&hsa_acc=7964138385&hsa_cam=21215649534&hsa_grp=164498894074&hsa_ad=697550537249&hsa_src=g&hsa_tgt=dsa-2299591633356&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqO8pzVWw0iAvy4Jq6__BnHS71swgDeasVfuby4eOy2PMzTbvYeyKHhoCwOgQAvD_BwE" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: white; text-decoration: none; border-radius: 5px;">
        <strong>Ver Curso de Comunicação</strong>
      </a>
      <br/><br/>
      <p>Além disso, como você tem uma personalidade enérgica, pode ser útil aprender a gerenciar conflitos que possam surgir 🤗:</p>
      <a href="https://www.alura.com.br/curso-online-gerenciamento-conflitos-aplicando-tecnicas-fundamentais" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: white; text-decoration: none; border-radius: 5px;">
        <strong>Ver Curso de Gestão de Conflitos</strong>
      </a>
    `;
    scoreText.innerHTML = scoreTag; 
  } else if (countB > countA && countB > countC && countB > countD) {
    let scoreTag =
      `
      <span>Ótimo 🤩! Você se encaixa com o Perfil B!</span>
      <p>Isso significa que você tende a ser <strong>sociável</strong>, <strong>confiante</strong> e <strong>entusiasta</strong> 🤝, mas também pode ser impulsivo.</p>
      <br/>
      <p>Para aprimorar sua inteligência emocional e gerenciar a impulsividade, recomendamos os seguintes cursos 🌱🧠:</p>
      <a href="https://www.alura.com.br/curso-online-comunicacao-se-expressar-bem-ser-compreendido?utm_term=&utm_campaign=&utm_source=adwords&utm_medium=ppc&hsa_acc=7964138385&hsa_cam=21215649534&hsa_grp=164498894074&hsa_ad=697550537249&hsa_src=g&hsa_tgt=dsa-2299591633356&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqO8pzVWw0iAvy4Jq6__BnHS71swgDeasVfuby4eOy2PMzTbvYeyKHhoCwOgQAvD_BwE" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: white; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Inteligência Emocional</strong>
      </a>
      <br/><br/>
      <p>Além disso, para canalizar seu entusiasmo e melhorar a produtividade, considere o seguinte curso: 📈</p>
      <a href="https://www.alura.com.br/curso-online-produtividade-administre-tempo" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: white; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Produtividade</strong>
      </a>
    `;
    scoreText.innerHTML = scoreTag;
  } else if (countC > countA && countC > countB && countC > countD) {
    let scoreTag =
      `
      <span>Excelente 😊! Você se encaixa com o Perfil C! </span>
      <p>Isso significa que você tende a ser <strong>paciente</strong>, uma boa <strong>pessoa de equipe</strong> e <strong>calmo</strong> 🌿, mas pode ser mais passivo.</p>
      <br/>
      <p>Para desenvolver proatividade e se destacar ainda mais, recomendamos o seguinte curso 📈:</p>
      <a href="https://www.alura.com.br/curso-online-habitos-eficazes?utm_term=&utm_campaign=&utm_source=adwords&utm_medium=ppc&hsa_acc=7964138385&hsa_cam=21215649534&hsa_grp=164498894074&hsa_ad=697550537249&hsa_src=g&hsa_tgt=dsa-2299591633356&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqNUifjayz20y7fd9jQVTwmYZRFZAp-XqY8OZBv67wzhrU2tyQRZcLxoC23UQAvD_BwE" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Hábitos Eficazes</strong>
      </a>
      <br/><br/>
      <p>Além disso, para estimular a liderança e evitar a complacência, considere o seguinte curso 👔:</p>
      <a href="https://www.alura.com.br/curso-online-lideranca-missao-proposito-liderar-pessoas" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Liderança</strong>
      </a>
    `;
    scoreText.innerHTML = scoreTag;
  } else if (countD > countA && countD > countB && countD > countC) {
    let scoreTag =`
      <span>Ótimo 😉! Você se encaixa com o Perfil D!</span>
      <p>Isso significa que você tende a ser <strong>diplomático</strong>, <strong>cordial</strong> e <strong>perfeccionista</strong> 🤝, e tende a ser mais sistemático.</p>
      <br/>
      <p>Para aprimorar suas habilidades de trabalho em equipe, recomendamos os seguintes cursos 👥:</p>
      <a href="https://www.alura.com.br/curso-online-principios-trabalho-equipe-relacao-colaborativa" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Trabalho em Equipe</strong>
      </a>
      <br/><br/>
      <p>Além disso, para fomentar a criatividade e pensar fora da caixa, considere o seguinte curso ✨:</p>
      <a href="https://www.alura.com.br/curso-online-criatividade-adequacao" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Criatividade</strong>
      </a>
    `;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      `
      <span>Não conseguimos definir um perfil específico para você 🤔</span>
      <p>No entanto, oferecemos alguns cursos que podem ser úteis para todos os perfis!</p>
      <br/>
      <p>Para aprimorar habilidades de comunicação e inteligência emocional, confira 🌱🧠:</p>
      <a href="https://www.alura.com.br/curso-online-comunicacao-se-expressar-bem-ser-compreendido?utm_term=&utm_campaign=&utm_source=adwords&utm_medium=ppc&hsa_acc=7964138385&hsa_cam=21215649534&hsa_grp=164498894074&hsa_ad=697550537249&hsa_src=g&hsa_tgt=dsa-2299591633356&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqO8pzVWw0iAvy4Jq6__BnHS71swgDeasVfuby4eOy2PMzTbvYeyKHhoCwOgQAvD_BwE" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Comunicação</strong>
      </a>
      <br/><br/>
      <p>Para melhorar a produtividade e gestão do tempo, considere este curso 📈:</p>
      <a href="https://www.alura.com.br/curso-online-produtividade-administre-tempo" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Produtividade</strong>
      </a>
      <br/><br/>
      <p>Se você deseja aprimorar suas habilidades de liderança, este curso pode ser útil 👔:</p>
      <a href="https://www.alura.com.br/curso-online-lideranca-missao-proposito-liderar-pessoas" 
         target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">
        <strong>Curso de Liderança</strong>
      </a>
    `;
    scoreText.innerHTML = scoreTag;
  }
}



function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> de <p>" +
    questions.length +
    "</p> Questões</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag;
}
