/**
 * 2) Задание по проекту 
- Получить кнопку "Начать расчет" через id +++
- Получить все блоки в правой части программы через классы (которые имеют класс название-value, начиная с <div class="budget-value"></div> и заканчивая <div class="yearsavings-value"></div> ) +++
- Получить поля (input) c обязательными расходами через класс (class=”expenses-item”) +++
- Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной
- Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
- Получить оставшиеся поля через querySelector (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день) 
 */

let money, time;
let startBtn = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudget = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value');

let expensesItem = document.getElementsByClassName('expenses-item'); // поля с обязат. расходами
let countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    expensesBtn = document.getElementsByTagName('button')[0];

let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');

let incomeItem = document.querySelector('.choose-income'),
    checkBox = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    persentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

countBudgetBtn.disabled = true;
optionalExpensesBtn.disabled = true;
expensesBtn.disabled = true;


startBtn.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY-MM-DD');
    money = +prompt('Ваш бюджет на месяц?');

    while (isNaN(money) || money == null || money == '') {
        money = +prompt('Ваш бюджет на месяц?');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    countBudgetBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    expensesBtn.disabled = false;
});

expensesBtn.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if (typeof a === 'string' && typeof a !== null && typeof b === 'string' && typeof b !== null && a !== '' && b !== '') {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;

});

optionalExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let a = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = a;
        optionalExpensesValue.textContent += `${appData.optionalExpenses[i]} `;
    }
});

countBudgetBtn.addEventListener('click', function () {

    if (appData.budget !== undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100)
            levelValue.textContent = 'Низкий уровень достатка';
        else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000)
            levelValue.textContent = 'Средний уровень достатка';
        else if (appData.moneyPerDay > 2000)
            levelValue.textContent = 'Высокий уровень достатка';
        else levelValue.textContent = 'Произошла ошибка';
    } else {
        levelValue.textContent = 'Произошла ошибка';
        dayBudget.textContent = 'Нажмите вначале кнопку Начать расчет';
    }
});

incomeItem.addEventListener('change', function () {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkBox.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +persentValue.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

persentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +persentValue.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
}