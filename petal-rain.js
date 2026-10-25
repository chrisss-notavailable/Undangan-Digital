(function () {
    'use strict';

    const sakuraConfig = {
        className: 'sakura',
        fallSpeed: 1.25,
        minSize: 9,
        maxSize: 15,
        delay: 500,
        colors: [
            { gradientColorStart: 'rgba(255, 255, 255, 0.92)', gradientColorEnd: 'rgba(240, 242, 245, 0.72)', gradientColorDegree: 120 },
            { gradientColorStart: 'rgba(255, 253, 242, 0.90)', gradientColorEnd: 'rgba(245, 238, 224, 0.68)', gradientColorDegree: 135 },
            { gradientColorStart: 'rgba(252, 250, 247, 0.88)', gradientColorEnd: 'rgba(236, 232, 222, 0.62)', gradientColorDegree: 110 },
            { gradientColorStart: 'rgba(255, 250, 240, 0.90)', gradientColorEnd: 'rgba(244, 236, 220, 0.65)', gradientColorDegree: 125 }
        ]
    };

    let isInvitationOpened = false;

    window.startPetalRain = function () {
        if (isInvitationOpened) return;
        isInvitationOpened = true;

        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        setTimeout(() => {
            if (typeof Sakura !== 'undefined') {
                new Sakura('#sakura-container', sakuraConfig);
            }
        }, 500);
    };
})();

