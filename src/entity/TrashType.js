import landfill from "../../resource/TrashType/landfill.svg"
import incineration from "../../resource/TrashType/incineration.svg"

import normaltrash from "../../resource/TrashType/normaltrash.svg"
import foodwaste from "../../resource/TrashType/foodwaste.svg"
import etc from "../../resource/TrashType/etc.svg"

import factory from "../../resource/TrashType/factory.svg";
import residental from "../../resource/TrashType/residental.svg"

import normal from "../../resource/TrashType/normal.svg";
import recyclic from "../../resource/TrashType/recyclic.svg";
import sack from "../../resource/TrashType/sack.svg";

import all from "../../resource/TrashType/all.svg";


const TrashType = {
    "소각용" : incineration,
    "매립용" : landfill,
    "기타" : etc,
    "생활쓰레기" : normaltrash,
    "음식물쓰레기" : foodwaste,
    "가정용" : residental,
    "사업장용" : factory,
    "규격봉투" : normal,
    "재사용규격봉투" : recyclic,
    "특수규격마대" : sack,
    "모두" : all
}

export default TrashType;