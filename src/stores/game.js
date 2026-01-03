import {persisted} from "./persist";


export const game = persisted("settings", {
    nick: "",
    level: "",
    status: 0,
    sCorrects: null,
    sWrongs:null,
    stuckQuestion: null,
    sTest: null
})
