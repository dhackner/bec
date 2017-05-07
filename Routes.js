import _ from 'lodash';

const routes = [
    {
        key: 'homepage',
        continue: 'speaking',
        text: 'WHO',
        image: require('./img/who_crest.png'),
    }, {
        key: 'speaking',
        no: 'speakingAtAll',
        yes: 'breathing',
        bodyText: 'Is the patient speaking easily?',
        image: require('./img/01_Adultheadtiltandchinlift.jpg'),
    }, {
        key: 'speakingAtAll',
        text: 'Can the patient speak at all?',
        image: require('./img/04_Adultjawthrust.jpg'),
    }, {
        key: 'breathing',
        no: 'assistBreathing',
        yes: 'normalBreathing',
        text: 'Is the patient breathing?',
    },
];

const findRoute = (routeKey) => {
    return _.find(routes, {key: routeKey})
};

export { findRoute }
