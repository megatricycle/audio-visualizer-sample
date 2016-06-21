window.onload = function () {
    var audio = document.getElementById('myAudio');
    var graph = document.getElementById('graph');

    var ctx = new AudioContext();
    var audioSrc = ctx.createMediaElementSource(audio);

    var analyser = ctx.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);

    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // create bar nodes
    for(var i = 0; i < frequencyData.length; i++) {
        var el = document.createElement('div');
        el.setAttribute('class', 'bar');
        el.setAttribute('index', i);
        graph.appendChild(el);
    }

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        // update data in frequencyData
        analyser.getByteFrequencyData(frequencyData);
        // render frame based on values in frequencyData
        var el = document.getElementsByClassName('bar')

        for(var i = 0; i < frequencyData.length; i++) {
            var val = frequencyData[i];

            el[i].style.height = val? val: 1 + 'px';
            el[i].style.background = 'rgb(0, 0, ' + val + ')';
        }
    }
    renderFrame();

    audio.play();
}