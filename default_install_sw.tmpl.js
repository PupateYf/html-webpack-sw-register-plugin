`if (navigator.serviceWorker) {
    navigator.serviceWorker.register(${sw_path}).then(function(registration) {
        console.log('service worker register successfully');
    }).catch(function (err) {
        console.log('servcie worker fail to register')
    });
}`