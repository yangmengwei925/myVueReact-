import _ from 'lodash';

const localStorage = window.localStorage;

export default {
    getLocalStorage(item) {
        let data = JSON.parse(localStorage.getItem(item));
        return _.isEmpty(data) ? null : data;
    },
    setLocalStorage(item, data) {
        localStorage.setItem(item, JSON.stringify(data));
    }
}