// fetching all data from the firestore collection and displaying them 
useEffect(() => {
    projectFireStore.collection('Products').orderBy('productName').onSnapshot(snap => {
        let temporaryArray = []
        snap.forEach(document => {
            temporaryArray.push({ id: document.id, ...document.data()})
        })
        setImageLinkArray(temporaryArray)
    })
    imageLinkArray.forEach(product => console.log(product.imageLink))
    let secondTemporaryArray = []
    imageLinkArray.forEach( product => secondTemporaryArray.push(product.id))
    
    setExtractIDOnLoad(secondTemporaryArray)
    console.log('extract id array = ', extractIDOnLoad)

}, [ ])