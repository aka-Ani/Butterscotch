const {
    app,
    BrowserWindow,
    session
} = require('electron')

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1100,
        height: 750,
        title: "Butterscotch",
        autoHideMenuBar: true
    })

    mainWindow.on('page-title-updated', (evt) => {
        evt.preventDefault();
    });

    // Set Access Control headers in response to bypass CORS
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'access-control-allow-origin': ['*'],
                'access-control-allow-headers': ['*']
            }
        });
    });

    mainWindow.loadURL('https://hoppscotch.io')

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.