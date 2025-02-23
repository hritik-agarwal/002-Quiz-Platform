import {
  getAllElem,
  getElem,
  getLocalStorageKey,
  getLocalStorageData,
  setLocalStorageData,
} from "../script.js";

// Input Elements
const form_input = getElem("#create-question-form");
const desc_field = getElem('input[name="ques-desc"');
const soln_field = getElem('input[name="ques-solution"');
const type_field = getElem('select[name="ques-type"]');
const bank_text_field = getElem('input[name="ques-bank-text"]');
let answer_field = getElem(".ans-type:not(.hidden)");

form_input.addEventListener("submit", handleFormSubmit);
type_field.addEventListener("change", handleQuesTypeChange);

function getQuestionConfig() {
  let answer = "";
  if (answer_field.tagName !== "DIV") {
    answer = answer_field.value;
  } else {
    const answer_options = getAllElem('input[type="text"]', answer_field);
    answer = Array.from(answer_options)
      .map((option) => {
        return {
          checked: option.previousElementSibling.checked,
          description: option.value,
        };
      })
      .filter(({ description }) => description.length !== 0);
  }

  return {
    description: desc_field.value,
    solution: soln_field.value,
    type: type_field.value,
    question_bank: bank_text_field.value,
    answer: answer,
  };
}

function handleFormSubmit(e) {
  e.preventDefault();
  const newQuestion = getQuestionConfig();
  const questionnaireKey = getLocalStorageKey("questionnaire");
  const currentQuestions = getLocalStorageData(questionnaireKey);
  const newQuestions = [...(currentQuestions || []), newQuestion];
  setLocalStorageData(questionnaireKey, newQuestions);
  console.log(newQuestions);
}

function handleQuesTypeChange() {
  const _id = `ans-type-${type_field.value}`;
  for (let ansType of getAllElem(".ans-type")) {
    if (ansType.id === _id) {
      ansType.classList.remove("hidden");
    } else {
      ansType.classList.add("hidden");
    }
  }
  answer_field = getElem(".ans-type:not(.hidden)");
}
