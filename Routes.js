import _ from 'lodash';

const routes = [
    {
        key: 'homepage',
        next: 'speaking',
        bodyText: 'WHO',
        image: [
            require('./img/who_crest.png'),
        ],
    },
    // TODO | Save in state and use to pick later slides
    //{
        //key: 'child',
        //yes: 'speaking',
        //no: 'speaking',
        //bodyText: 'Is the patient a child?',
    //},

    // Airway
    {
        key: 'speaking',
        yes: 'breathing',
        no: 'speakingAtAll',
        bodyText: 'Is the patient speaking easily?',
    }, {
        key: 'speakingAtAll',
        yes: 'hoarseOrRaspy',
        no: 'conscious',
        bodyText: 'Can the patient speak at all?',
    }, {
        key: 'conscious',
        yes: 'obstructedAirway',
        no: 'traumaAirway',
        bodyText: 'Is the patient conscious?',
    }, {
        key: 'traumaAirway',
        yes: 'stabilizeCervicalSpine',
        no: 'headTiltChinLift',  // TODO | Route child to headTiltChinLiftChild
        bodyText: 'Look to see if the chest wall is moving and listen to see if there is air movement from the mouth or nose.\n\nAre there signs of trauma?',
    }, {
        key: 'suctionTrauma',
        yes: 'airwayDevices',
        no: 'reassessAirway',
        bodyText: 'Suction blood or secretions.\n\nWill the patient tolerate an airway device such as an oral or nasopharyngeal airway?',
    }, {
        key: 'reassessAirway',
        yes: 'breathing',
        no: 'speaking',
        bodyText: 'Is the airway stable or improved?',
    }, {
        key: 'hoarseOrRaspy',
        yes: 'swellingDroolingStridor',
        no: 'obstructedAirway',
        bodyText: 'Is the patient hoarse or raspy?',
    }, {
        key: 'headTiltChinLiftChild',
        next: 'obstructedAirway',
        bodyText: 'Head tilt and chin lift. (As per SKILLS section)',
        // TODO | Which image? Jaw thrust??
        image: [
            require('./img/03_Head-tiltandchin-liftinchildrennotrauma.jpg'),
        ],
    }, {
        key: 'headTiltChinLift',
        next: 'obstructedAirway',
        bodyText: 'Head tilt and chin lift. (As per SKILLS section)',
        // TODO | Which image? Jaw thrust??
        image: [
            require('./img/01_Adultheadtiltandchinlift.jpg'),
        ],
    }, {
        key: 'stabilizeCervicalSpine',
        yes: 'suctionTrauma',
        no: 'airwayDevices',
        bodyText: 'Stabilize cervical spine.\n\nIs there blood or secretions?',
    }, {
        key: 'airwayDevices',
        next: 'reassessAirway',
        bodyText: 'Place a supplemental airway device (As per SKILLS section)',
        image: [
            require('./img/10_Nasopharyngealairwayinsertion_1.jpg'),
            require('./img/10_Nasopharyngealairwayinsertion_2.jpg'),
            require('./img/10_Nasopharyngealairwayinsertion_3.jpg'),
            require('./img/10_Nasopharyngealairwayinsertion_4.jpg'),
            // TODO | Can Oropharyngeal be split off?
            //require('./img/11_Oropharyngealairwayinsertion_1.jpg'),
            //require('./img/11_Oropharyngealairwayinsertion_2.jpg'),
            //require('./img/11_Oropharyngealairwayinsertion_3.jpg'),
            //require('./img/11_Oropharyngealairwayinsertion_4.jpg'),
            //require('./img/11_Oropharyngealairwayinsertion_5.jpg'),
        ],
    }, {
        key: 'pregnantAirway',
        yes: 'chestThrust',
        no: 'abdominalThrust',  // TODO | Route child to chestThrustBackPatChild
        bodyText: 'Is the patient pregnant?',
    }, {
        key: 'chestThrust',
        next: 'reassessAirway',
        bodyText: 'Give chest thrusts. (As per SKILLS sections)',
        image: [
            require('./img/07_Chestthrustsforchokinginlatepregnancy.jpg'),
        ],
    }, {
        key: 'abdominalThrust',
        next: 'reassessAirway',
        bodyText: 'Give abdominal thrusts. (As per SKILLS sections)',
        image: [
            require('./img/05_Abdominalthrustsforchokingadult.jpg'),
        ],
    }, {
        //key: 'chestThrustBackPatChild',
        //next: 'reassessAirway',
        //bodyText: 'Give chest thrust and back pat. (As per SKILLS section)',
        //image: [
            //require('./img/08_Chestthrustsforchokingininfants.jpg'),
            //require('./img/09_Backblowsforchokingininfants.jpg'),
        //],
    //}, {
        key: 'obstructedAirway',
        yes: 'bloodOrSecretions',
        no: 'chokingHistory',
        bodyText: 'Look inside the mouth. Is the airway obstructed?',
    }, {
        key: 'chokingHistory',
        yes: 'pregnantAirway',
        no: 'swellingDroolingStridor',
        bodyText: 'Are there signs or history of choking?',
    }, {
        key: 'bloodOrSecretions',
        yes: 'suction',
        no: 'visibleObject',
        bodyText: 'Is there blood or secretions?',
    }, {
        key: 'suction',
        next: 'airwayDevices',
        bodyText: 'Suction secretions or blood.\n\nPlace in recovery position. (As per SKILLS section)',
        image: [
            require('./img/30_Recoveryposition.jpg'),
        ],
    }, {
        key: 'visibleObject',
        yes: 'encourageCough',
        no: 'swellingDroolingStridor',
        bodyText: 'Is there a visible object in the airway?',
    }, {
        key: 'encourageCough',
        next: 'objectCleared',
        bodyText: 'Encourage speaking or coughing.',
    }, {
        key: 'objectCleared',
        yes: 'reassessAirway',
        no: 'pregnantAirway',
        bodyText: 'Is the obstruction cleared?',
    }, {
        key: 'arrangeTransferAirway',
        next: 'breathingCheck',
        bodyText: 'Arrange for rapid transfer and continue evaluation.',
        image: [
            require('./img/Transfer.jpg'),
        ],
    }, {
        key: 'inhalationInjuryHistory',
        yes: 'arrangeTransferAirway',
        no: 'rashOrAnaphylaxis',
        bodyText: 'Is there a history of fire or inhalation injury?',
    }, {
        key: 'swellingDroolingStridor',
        yes: 'rashOrAnaphylaxis',
        no: 'inhalationInjuryHistory',
        bodyText: 'Is there swelling, drooling or stridor?',
    }, {
        key: 'rashOrAnaphylaxis',
        yes: 'adrenalineAirways',
        no: 'arrangeTransferAirway',
        bodyText: 'Is there a rash, wheezing, or other signs of anaphylaxis?',
    }, {
        key: 'adrenalineAirways',
        next: 'reassessAirway',
        bodyText: 'Give intramuscular adrenaline. (As per SKILLS section)',
        image: [
            require('./img/Adrenaline.jpg'),
        ],
    },

    // Breathing
    {
        key: 'breathingCheck',
        yes: 'normalBreathing',
        no: 'assistBreathing',
        bodyText: 'Is the patient breathing?',
    },
];

const _routeIndex = 0;
const findRoute = (routeKey) => {
    var foundRoute =  _.clone(_.find(routes, {key: routeKey}));
    // The key field is used in the route stack and must be unique.
    // However, loops are valid in our graph, so we instead just use an
    // index.
    foundRoute.key = _routeIndex++;
    return foundRoute;
};

export { findRoute }




    //}, {
        //key: '',
        //yes: '',
        //no: '',
        //bodyText: '',
        //image: [
            //require('./img/01_Adultheadtiltandchinlift.jpg'),
        //],
