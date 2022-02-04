
let money, time;

function start() {

    // time = prompt('Введите дату в формате YYYY-DD-MM');
    money = +prompt('Ваш бюджет на месяц?');

    while (isNaN(money) || money == null || money == '') {
        money = +prompt('Ваш бюджет на месяц?');
    }
}
// start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt('Введите обязательную статью расходов в этом месяце'),
                b = prompt('Во сколько обойдется?');

            if (typeof a === 'string' && typeof a !== null && typeof b === 'string' && typeof b !== null && a !== '' && b !== '') {
                appData.expenses[a] = b;
            }
            else {
                i = i - 1;
            }
        }
    },
    detectDayBudget: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert(`Дневной бюджет: ${appData.moneyPerDay}`);
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let saveMoney = prompt('Сумма ваших накоплений'),
                percent = prompt('Под какой процент?');

            appData.monthIncome = saveMoney / 100 / 12 * percent;
            alert(`Месячные накопления ${appData.monthIncome}`);
        }
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 100) console.log('Низкий уровень достатка')
        else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) console.log('Средний уровень достатка')
        else if (appData.moneyPerDay > 2000) console.log('Высокий уровень достатка')
        else console.log('Произошла ошибка')
    },
    chooseOptExpenses() {
        for (let i = 0; i < 2; i++) {
            let a = prompt(`Статья необязательных расходов: ${i + 1}`);
            appData.optionalExpenses[i] = a;
        }
    },
    chooseIncome: function () {
        let items = prompt('Что принесет дополнительный доход. Перечислите через запятую');
        if (items !== '' && typeof items !== null && typeof items !== 'string') {
            console.log('Вы ввели неправильные данные');
        }
        else {
            appData.income = items.split(', ');
            appData.income.push(prompt('Может что-то еще добавить?'));
            appData.income.sort();
        }
        appData.income.forEach((element, index) => {
            alert(`Способы дополнительного заработка: ${index + 1}: ${element}`);
        });
    }
}

for (const key in appData) {
    console.log(`Наша программа включает в себя данные: ${key}:  ${appData[key]}`)
}

