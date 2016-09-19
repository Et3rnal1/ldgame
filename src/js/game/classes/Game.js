/**
 * Created by Eternal1 on 9/13/2016.
 */

import PleasuresList from './PleasuresList';
import Score from './Score';

export default class Game {
    constructor() {
        this.overlay = document.querySelector('.start-overlay');
        this.game = document.querySelector('.game-content');
        this.interior = this.game.querySelector('.interior-board');

        this.score = new Score;
        this.list = new PleasuresList();
        this.currentItem = null;

        this.overlay.querySelector('.start-button')
            .addEventListener('click', () => this.begin());

        [...this.score.resultContainer
            .querySelectorAll('.game-repeat')]
            .forEach( item => item.addEventListener('click', () =>
                    this.restart().then(() => this.begin())
                )
            )
    }

    countdown() {
        return new Promise( (resolve, reject) => {
            let countDown = this.game.querySelector('.game-countdown');
            let count = parseInt(countDown.dataset.count);
            countDown.innerText = count;

            let timer = setInterval(function() {
                if (count > 1) {
                    countDown.innerText = --count;
                } else {
                    clearInterval(timer);
                    countDown.innerText = '';
                    resolve();
                }
            }, 1000);
        });
    }

    begin() {
        this.overlay.classList.add('hide');
        this.start().then( () => this.finish() )
    }

    restart() {
        return new Promise((resolve, reject) => {
            let video = this.game.querySelector('video');

            video.pause();
            video.currentTime = 0;
            [...this.game.querySelectorAll('.hide')].forEach( item => item.classList.remove('hide'));
            [...this.interior.querySelectorAll('.shown')].forEach(item => item.classList.remove('shown'));

            this.game.querySelector('.box-pleasure').innerText = '';

            this.score.reset();
            this.list.reset();
            window.setTimeout(() => resolve(), 100);
        });
    }

    start() {
        return new Promise((resolve, reject) => {
            this.game.querySelector('video').play();
            let counter = this.game.querySelector(".box-timer");
            let count = parseInt(counter.dataset.time);

            counter.innerText = ("00" + count).slice (-3);

            let timer = window.setInterval(() => {
                if (count > 1) {
                    counter.innerText = ("00" + --count).slice (-3);
                } else {
                    clearInterval(timer);
                    clearInterval(pleasuresTimer);
                    resolve()
                }
            }, 1000);

            setTimeout(() => this.showNextPleasure(), 1000);

            let pleasuresTimer = window.setInterval(() => {
                this.showNextPleasure();
            }, 5000);
        });
    }

    showNextPleasure() {
        this.currentItem = this.list.nextPleasure();

        if (this.currentItem) {
            let pleasure = this.game.querySelector('.game-pleasure-'+this.currentItem.name);
            let side = Math.random() > 0.5 ? 'animated-pleasure-left' : 'animated-pleasure-right';
            pleasure.classList.add(side);

            if (!this.score.repeat) {
                pleasure.addEventListener('click', () => {
                    pleasure.classList.add('hide');
                    this.interior.querySelector(".board-"+this.currentItem.name).classList.add('shown');
                    this.game.querySelector('.box-pleasure').innerText = this.currentItem.data.title;
                    this.score.addItem(this.currentItem.name);
                });
            }

            setTimeout(() => {
                pleasure.classList.remove(side);
            }, 4100);
        }
    }

    finish() {
        return new Promise(() => this.score.showResult());
    }
}