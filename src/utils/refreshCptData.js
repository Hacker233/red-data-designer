import {Message} from "element-ui";

export async function getDataStr(cptDataForm){
    let resStr = '{}';//防止JSON解析报错
    const iptStr = cptDataForm.dataText;
    if (cptDataForm.dataSource === 1){
        resStr = iptStr;
    }else if(cptDataForm.dataSource === 2){//调接口
        resStr = iptStr;
    }else if(cptDataForm.dataSource === 3){
        resStr = iptStr;
    }
    return resStr;
}

let cptTimer = {}

export function pollingRefresh(uuid, cptDataForm, loadData){
    if(uuid) {
        clearInterval(cptTimer[uuid]);//清除旧的定时器
    }
    if (!cptDataForm){
        Message.warning("cptDataForm==>null");
        return;
    }
    if (!loadData){
        Message.warning("子组件未实现数据解析方法");
        return;
    }
    loadData();
    if (cptDataForm.pollTime && cptDataForm.pollTime !== 0) {//轮询
        cptTimer[uuid] = setInterval(function () {
            loadData();
        }, cptDataForm.pollTime * 1000)
    }
}

export function clearCptInterval(uuid, clearAll){
    if(uuid) {
        clearInterval(cptTimer[uuid]);//清除旧的定时器
    }
    if (clearAll){
        for (const key in cptTimer) {
            clearInterval(cptTimer[key]);
        }
    }
}
