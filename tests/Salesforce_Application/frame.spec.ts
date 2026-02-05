// import { test } from "@playwright/test";


// test(`Learn frames`,async ({page}) => {
    



//     await page.goto(`https://www.amazon.in/`);


//     const allframes = page.frames(); //[mainpage, frame1,frame2,frame3,frame4] 
//                                     // Index =>[0,1,2,3,4]
//                                     //length => 1,2,3,4,5
//    // console.log(allframes);


//     const frameCount = allframes.length


//     console.log(frameCount); 



//     for (let index = 0; index < frameCount ; index++) { // index =>4< frameCount (5)
    
//             /* allframes[0] => mainPage
//                allframes[1] => frame1
//                allframes[2] => frame2
//                allframes[3] => frame3
//                allframes[4] => frame4*/  //allframes==> [frame1,frame2,frame3,frame4] =>[0,1,2,3]


//                     const title = await allframes[index].title();


//                     console.log(`The title of the frames are ${title}`);
                    
   
//             }


//     await page.waitForTimeout(3000)
    
// })


/*  */




import { test } from "@playwright/test";


// test(`Learn frames interaction`,async ({page}) => {



//     await page.goto(`https://leafground.com/frame.xhtml`);


//     const frameRef = page.frameLocator(`[src="default.xhtml"]`) // Step1 idetify the frame in which that element is present


//            await frameRef.locator("#Click").click(); // Step2 the control moves into the frame==> page


//            //mainpage => await page.locator("#Click")
//            await page.waitForTimeout(3000)
// })



test.only(`Learn nested frames interaction`,async ({page}) => {



    await page.goto(`https://leafground.com/frame.xhtml`);


    const frameRefOuterFrame = page.frameLocator(`[src="page.xhtml"]`) // Step1 idetify the outer frame in which that element is present



     const frameRefInnerrFrame = frameRefOuterFrame.frameLocator(`[id="frame2"]`)
          
    
    
    
    await frameRefInnerrFrame.locator("#Click").click(); // Step2 the control moves into the frame==> page


           //mainpage => await page.locator("#Click")
           await page.waitForTimeout(3000)
})