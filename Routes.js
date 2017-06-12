import _ from 'lodash';

// TODO | Christian - route/image audit
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
        yes: 'breathingCheck',
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
        yes: 'breathingCheck',
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
        bodyText: 'Head tilt and chin lift.',
        // TODO | Which image? Jaw thrust??
        image: [
            require('./img/03_Head-tiltandchin-liftinchildrennotrauma.jpg'),
        ],
    }, {
        key: 'headTiltChinLift',
        next: 'obstructedAirway',
        bodyText: 'Head tilt and chin lift.',
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
        bodyText: 'Place a supplemental airway device.',
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
        bodyText: 'Give chest thrusts.',
        image: [
            require('./img/07_Chestthrustsforchokinginlatepregnancy.jpg'),
        ],
    }, {
        key: 'abdominalThrust',
        next: 'reassessAirway',
        bodyText: 'Give abdominal thrusts.',
        image: [
            require('./img/05_Abdominalthrustsforchokingadult.jpg'),
        ],
    }, {
        //key: 'chestThrustBackPatChild',
        //next: 'reassessAirway',
        //bodyText: 'Give chest thrust and back pat.',
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
        bodyText: 'Suction secretions or blood.\n\nPlace in recovery position.',
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
        bodyText: 'Give intramuscular adrenaline.',
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
    }, {
        key: 'normalBreathing',
        yes: 'giveOxygen',
        no: 'pulseCirculation',
        bodyText: 'Is there increased work of breathing?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'giveOxygen',
        next: 'slowedBreathing',
        bodyText: 'Give oxygen for abnormal breathing.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'slowedBreathing',
        yes: 'pinpointPupils',
        no: 'traumaBreathing',
        bodyText: "Is the patient's breathing slowed?",
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'traumaBreathing',
        yes: 'tracheaMidline',
        no: 'anaphylaxisBreathing',
        bodyText: 'Are there signs of trauma?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'tracheaMidline',
        yes: 'crepitusCheck',
        no: 'needleDecompression',
        bodyText: 'Is the trachea midline?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'crepitusCheck',
        yes: 'needleDecompression',
        no: 'decreasedBreathSounds',
        bodyText: 'Is there crepitus (cracking or popping) over the chest wall?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'decreasedBreathSounds',
        yes: 'needleDecompression',
        no: 'abnormalChestWallMovement',
        bodyText: 'Are there decreased breath sounds or hyperresonance to percussion of the chest?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'abnormalChestWallMovement',
        yes: 'flailChestTreatment',
        no: 'suckingChestWound',
        bodyText: 'Is there abnormal chest wall movement which may indicate a flail chest?',
    }, {
        key: 'suckingChestWound',
        yes: 'treatSuckingChestWound',
        no: 'burnsPresent',
        bodyText: 'Is there a sucking chest wound?',
    }, {
        key: 'assistBreathing',
        next: 'prepareTransferBreathing',
        bodyText: 'Assist breathing with bag-valve-mask ventilation.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'pinpointPupils',
        yes: 'naloxoneBreathing',
        no: 'assistBreathing',
        bodyText: 'Are there pinpoint pupils?',
    }, {
        key: 'anaphylaxisBreathing',
        yes: 'adrenalineBreathing',
        no: 'wheezing',
        bodyText: 'Are there signs of anaphylaxis?',
    }, {
        key: 'needleDecompression',
        next: 'abnormalChestWallMovement',
        bodyText: 'Perform needle decompression of pneumothorax.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'flailChestTreatment',
        next: 'suckingChestWound',
        bodyText: 'If flail chest, consider treatment with chest wall splinting as able. Ensure adequate treatment of underlying pneumothorax.',
        // TODO | Text mentions preparing patient for transfer?
    }, {
        key: 'reassessAirway',
        yes: 'pulseCirculation',
        no: 'breathingCheck',
        bodyText: 'Is breathing stable or improved?',
    }, {
        key: 'naloxoneBreathing',
        next: 'reassessAirway',
        bodyText: 'Give Naloxone if available.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'adrenalineBreathing',
        next: 'wheezing',
        bodyText: 'Give Adrenaline.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'wheezing',
        yes: 'salbutamol',
        no: 'pulseCirculation',
        bodyText: 'Is there wheezing?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'prepareTransferBreathing',
        next: 'reassessAirway',
        bodyText: 'Prepare for rapid handover/transfer.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'salbutamol',
        next: 'pulseCirculation',
        bodyText: 'Give Salbutamol.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'checkFollowingBreathing',
        yes: 'prepareTransferBreathing',
        no: 'pulseCirculation',
        bodyText: 'Were there any of the following?\n- Pneumothorax\n- Flail chest\n- Sucking chest wound',
    }, {
        key: 'burnsPresent',
        next: 'checkFollowingBreathing',
        bodyText: 'Are there circumferential chest or abdominal burns or burns restricting breathing?',
    }, {
        key: 'treatSuckingChestWound',
        next: 'burnsPresent',
        bodyText: 'Treat sucking chest wound with three-sided dressing.',
        // TODO | Really no image here?
    },

    // Circulation
    {
        key: 'pulseCirculation',
        yes: 'poorPerfusionCheck',
        no: 'CPR',
        bodyText: 'Does the patient have a pulse?',
    }, {
        key: 'CPR',
        next: 'awakeAndAlert',
        bodyText: 'Follow local CPR protocol.',
    }, {
        key: 'poorPerfusionCheck',
        yes: 'giveIV',
        no: 'awakeAndAlert',
        bodyText: 'Are there signs of poor perfusion? (Cool, moist extremities, diaphoresis or excessive sweating, low blood pressure, tachypnoea, tachycardia thready pulse, mottled skin, sunken fontanelle or poor skin pinch.)',
        // TODO | check rendering of body text
    }, {
        key: 'giveIV',
        next: 'externalBleedingCheck',
        bodyText: 'Lay the patient flat. Obtain IV access and give IV fluids.',
        image: [
            //require('./img/.jpg'),
            // TODO | child vs adult picture
        ],
    }, {
        key: 'externalBleedingCheck',
        yes: 'controlBleeding',
        no: 'internalBleedingCheck',
        bodyText: 'Are there signs of external bleeding or external trauma?',
    }, {
        key: 'internalBleedingCheck',
        yes: 'pelvisFractureCheck',
        no: 'distendedNeckVeins',
        bodyText: 'Are there signs of internal bleeding? (Bruising around the umbilicus or over the flanks, vomiting blood, blood per rectum or vagina, or blood in the urine.)',
    }, {
        key: 'distendedNeckVeins',
        yes: 'muffledHeartSounds',
        no: 'infectionCheck',
        bodyText: 'Are there distended neck veins?',
    }, {
        key: 'muffledHeartSounds',
        yes: 'pericardialTamponade',
        no: 'pneumothoraxCheck',
        bodyText: 'Are there muffled heart sounds?',
    }, {
        key: 'pericardialTamponade',
        next: 'arrangeTransferCirculation',
        bodyText: 'Consider pericardial tamponade and arrange rapid transfer to surgical center.\n\nContinue IV fluids to maintain perfusion.',
    }, {
        key: 'controlBleeding',
        next: 'internalBleedingCheck',
        bodyText: 'Control bleeding. Remember to apply direct pressure to bleeding wounds.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'pelvisFractureCheck',
        yes: 'splintPelvis',
        no: 'arrangeTransferCirculation',
        bodyText: 'Are there signs of pelvis fracture or open pelvis?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'infectionCheck',
        yes: 'antibiotics',
        no: 'supplyFluids',
        bodyText: 'Are there signs of infection?\n\nExamples: Fever, pus, rash, diarrhea.',
    }, {
        key: 'pneumothoraxCheck',
        yes: 'emergencyNeedleDecompression',
        no: 'arrangeTransferCirculation',
        bodyText: 'Reassess breath sounds.\n\nAre there decreased breath sounds or tracheal deviation?',
    }, {
        key: 'arrangeTransferCirculation',
        next: 'reassessCirculation',
        bodyText: 'Arrange transfer to surgical center and refer for blood transfusion and ongoing surgical management if needed.',
    }, {
        key: 'supplyFluids',
        next: 'awakeAndAlert',
        bodyText: 'Continue to give fluids and move on to Disability.',
    }, {
        key: 'splintPelvis',
        next: 'arrangeTransferCirculation',
        bodyText: 'Split pelvis.',
        image: [
            //require('./img/.jpg'),
            //require('./img/.jpg'),
        ],
    }, {
        key: 'reassessCirculation',
        yes: 'awakeAndAlert',
        no: 'pulseCirculation',
        bodyText: 'Have signs of circulation stabilized or improved with interventions',
    }, {
        key: 'antibiotics',
        next: 'reassessCirculation',
        bodyText: 'Give antibiotics and continue IV fluid resucitation',
    }, {
        key: 'emergencyNeedleDecompression',
        next: 'reassessAirwayCirculation',
        bodyText: 'Perform needle decompression.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'reassessAirwayCirculation',
        yes: 'arrangeTransferCirculation',
        no: 'reassessCirculation',
        bodyText: 'Have breath sounds improved?',
    },


    // Disability
    {
        key: 'awakeAndAlert',
        yes: 'fullyExposed',
        no: 'mentatingNormally',
        bodyText: 'Is the patient awake and alert?',
    }, {
        key: 'mentatingNormally',
        next: 'traumaCheck',
        bodyText: 'Assess the AVPU or GCS level of consciousness of the patient.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'traumaCheck',
        yes: 'immobilizeSpine',
        no: 'recoveryPositionDisability',
        bodyText: 'Are there signs of trauma (such as bleeding, bruising or deformity)?',
    }, {
        key: 'recoveryPositionDisability',
        next: 'glucoseTesting',
        bodyText: 'Place the patient in the recovery position.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'glucoseTesting',
        yes: 'glucoseUnder3.5',
        no: 'hypoclycemiaConcern',
        bodyText: 'Is glucose testing available?',
    }, {
        key: 'glucoseUnder3.5',
        yes: 'giveGlucoseDisability',
        no: 'seizureCheck',
        bodyText: 'Is glucose level < 3.5 mmol/L?',
    }, {
        key: 'seizureCheck',
        yes: 'pregnantCheckDisability',
        no: 'localizingSymptoms',
        bodyText: 'Is the patient having a seizure? (Look for abnormal repetitive movements or shaking on one or both sides of the body.)',
    }, {
        key: 'localizingSymptoms',
        yes: 'spinalInjuryConcern',
        no: 'smallPupilsOrSlowBreathingCheck',
        bodyText: 'Localizing symptoms or uneven pupils?',
        image: [
            //require('./img/.jpg'),
        ],
        // TODO | Some text about linking to symptoms teaching set?
    }, {
        key: 'smallPupilsOrSlowBreathingCheck',
        yes: 'naloxoneDisability',
        no: 'fullyExposed',
        bodyText: 'Small (pinpoint) pupils or slow breathing?',
    }, {
        key: 'immobilizeCervicalSpine',
        next: 'glucoseTesting',
        bodyText: 'Immobilize the cervical spine.',
    }, {
        key: 'hypoclycemiaConcern',
        yes: 'giveGlucoseDisability',
        no: 'seizureCheck',
        bodyText: 'Is there a high concern for hypoglycemia? (History of diabetes medications or similar presentation in the past?)',
    }, {
        key: 'giveGlucoseDisability',
        next: 'seizureCheck',
        bodyText: 'Give IV Glucose.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'pregnantCheckDisability',
        yes: 'magnesiumSulfate',
        no: 'benzodiazepine',
        bodyText: 'Is the patient pregnant?',
    }, {
        key: 'spinalInjuryConcern',
        yes: 'immobilizeSpine',
        no: 'raiseBedHead',
        bodyText: 'Concern for spinal injury?',
    }, {
        key: 'naloxoneDisability',
        next: 'fullyExposed',
        bodyText: 'Give Naloxone if available.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'reassessDisability',
        yes: 'fullyExposed',
        no: 'traumaCheck',
        bodyText: 'Reasess the AVPU or GCS level of consciousness. Has there been any improvement?',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'magnesiumSulfate',
        next: 'reassessDisability',
        bodyText: 'Give magnesium sulfate.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'benzodiazepine',
        next: 'reassessDisability',
        bodyText: 'Give a benzodiazepine such as Diazepam however available - IV injection, intramuscular, or rectal.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'immobilizeSpine',
        next: 'arrangeTransferStrokeCenter',
        bodyText: 'Immobilize cervical, thoracic or lumbar spine.',
    }, {
        key: 'arrangeTransferStrokeCenter',
        next: 'reassessDisability',
        bodyText: 'Place in full spinal precautions, including immobilization of cervical spine, using log rolling technique if necessary. Arrange rapid transfer to a stroke facility.',
        image: [
            //require('./img/.jpg'),
        ],
    }, {
        key: 'raiseBedHead',
        next: 'arrangeTransferStrokeCenter',
        bodyText: 'Raise head of bed 30 degrees if no concern for spinal injury.',
    },

    // Exposure
    // TODO | fullyExposed
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
