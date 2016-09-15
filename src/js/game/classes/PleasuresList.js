/**
 * Created by Eternal1 on 9/13/2016.
 */

export default class PleasuresList {

    constructor() {
        this.list = {
            'lemonade': {
                'title': 'Холодный лимонад',
                'shown': false,
            },
            'coffee': {
                'title': 'Ароматный кофе',
                'shown': false,
            },
            'dinner': {
                'title': 'Ужин с друзьями',
                'shown': false,
            },
            'bicycle': {
                'title': 'Велосипед',
                'shown': false,
            },
            'pizza': {
                'title': 'Пицца',
                'shown': false,
            },
            'radio': {
                'title': 'Любимая песня',
                'shown': false,
            },
            'slippers': {
                'title': 'Домашние тапочки',
                'shown': false,
            },
            'film': {
                'title': 'Любимый фильм',
                'shown': false,
            },
            'bbq': {
                'title': 'Шашлыки',
                'shown': false,
            },
            'tickets': {
                'title': 'Билет в отпуск',
                'shown': false,
            },
            'hiking': {
                'title': 'Поход в горы',
                'shown': false,
            },
            'bowling': {
                'title': 'Боулинг',
                'shown': false,
            }
        }
    }

    nextPleasure() {
        for (var item in this.list) {
            if (this.list.hasOwnProperty(item) && !this.list[item].shown) {
                this.list[item].shown = true;
                return {
                    'name': item,
                    'data': this.list[item]
                };
            }
        }
    }

    catchPleasure(item) {
        this.list[item].taken = true;
    }

    reset() {
        for(var item in this.list) {
            if (this.list.hasOwnProperty(item)) {
                this.list[item].shown = false;
            }
        }
    }
}