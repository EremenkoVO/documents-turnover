import store from '../store';

export default function (to, _from, next) {
    if (store.getters.user) {
        next();
    } else {
        next ('/signin?loginError=true');
    }
}