/**
 * Created by Eternal1 on 9/13/2016.
 */

export default class Score {

    constructor() {
        this.statusBoard = document.querySelector('.interior-status-board');
        this.statusText = document.querySelector('.interior-status-text');
        this.collectedItems = [];
        this.repeat = false;
        this.resultContainer = document.querySelector('.game-result');

        this.info = ['', 'младший улыбашка', 'капитан смеха', 'старший хохотун', 'верховный весельчак']
    }

    addItem(item) {
        let oldStatus = this.calculateStatus();
        this.collectedItems.push(item);
        if (oldStatus != this.calculateStatus()) {
            this.updateStatus();
        }
    }

    calculateStatus() {
        return Math.ceil(this.collectedItems.length / 3)
    }

    updateStatus() {
        if (this.calculateStatus() > 1) {
            this.statusBoard.querySelector('.interior-status-' + (this.calculateStatus() - 1)).classList.remove('shown');
        }

        this.statusBoard.querySelector('.interior-status-' + this.calculateStatus()).classList.add('shown');
        this.statusText.innerText = this.info[this.calculateStatus()];
    }

    showResult() {
        this.resultContainer.classList.remove('hide');

        if (this.calculateStatus() > 0) {
            let popup = this.resultContainer.querySelector('.result-popup-some');
            popup.classList.add('shown');
            popup.querySelector('.result-pic > img').src = "img/game/result/"+this.calculateStatus()+".png";
            popup.querySelector('.result-stars > img').src = "img/game/stars/"+this.calculateStatus()+".jpg";
            popup.querySelector('.result-count').innerHTML = this.getPleasuresCountText();
            popup.querySelector('.result-title').innerText = "«" + this.info[this.calculateStatus()] + "»";
            if (this.repeat) {
                this.resultContainer.querySelector('.result-repeat').classList.add('shown');
            } else {
                this.resultContainer.querySelector('.result-new').classList.add('shown');
            }

        } else {
            this.resultContainer.querySelector('.result-popup-0').classList.add('shown');
        }
    }

    getPleasuresCountText() {
        switch(this.collectedItems.length) {
            case 1: return `Ура! Ты собрал ${this.collectedItems.length} реальную радость!<br/>Тебе присвоен ранг -`;
            case 2:
            case 3: return `Ура! Ты собрал ${this.collectedItems.length} реальные радости!<br/>Тебе присвоен ранг -`;
            case 4: return `Здорово! Ты собрал ${this.collectedItems.length} реальные радости!<br/>Тебе присвоен ранг -`;
            case 5:
            case 6: return `Здорово! Ты собрал ${this.collectedItems.length} реальных радостей!<br/>Тебе присвоен ранг -`;
            case 7:
            case 8:
            case 9: return `Круто! Ты собрал ${this.collectedItems.length} реальных радостей!<br/>Тебе присвоен ранг -`;
            default: return `Кайф! Ты собрал ${this.collectedItems.length} реальных радостей!<br/>Тебе присвоен ранг -`;
        }
    }

    reset() {
        this.resultContainer.classList.add('hide');
        this.repeat = true;
        this.collectedItems = [];

        [...this.statusBoard.querySelectorAll('.shown')].forEach(item => item.classList.remove('shown'));
        this.statusText.innerText = '';
        this.resultContainer.querySelector('.result-new').classList.remove('shown');
        this.resultContainer.querySelector('.result-popup-0').classList.remove('shown');
        this.resultContainer.querySelector('.result-popup-some').classList.remove('shown');
    }
}