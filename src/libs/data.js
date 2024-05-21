import { connectDB } from "@/libs/database";
import User from "@/models/cpa/User";
import Kardex from "@/models/academic/Kardex";
import Bitacora from "@/models/cpa/Bitacora";
import Curso from "@/models/courses/Curso";
import Inscription from "@/models/courses/Inscription";
import { sheets } from "@/libs/sheets";

export const loadUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    console.log(error);
  }
};

export const loadKardexs = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Kardex.find({ ru: { $regex: regex } }).count();
    const kardexs = await Kardex.find({ ru: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, kardexs };
  } catch (error) {
    console.log(error);
  }
};

export const loadBitacora = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Bitacora.find({
      "modifiedByUser.username": { $regex: regex },
    }).count();
    const bitacora = await Bitacora.find({
      "modifiedByUser.username": { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, bitacora };
  } catch (error) {
    console.log(error);
  }
};

export const loadCurso = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Curso.find({
      course: { $regex: regex },
    }).count();
    const cursos = await Curso.find({
      course: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, cursos };
  } catch (error) {
    console.log(error);
  }
};

export const loadInscription = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Inscription.find({
      ci: { $regex: regex },
    }).count();
    const inscription = await Inscription.find({
      ci: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    await listSync();
    return { count, inscription };
  } catch (error) {
    console.log(error);
  }
};

const listSync = async () => {
  try {
    const data = await sheets();
    const inscription = await Inscription.find();
    if (data.length != inscription.length) {
      for (const e of data) {
        const exists = await Inscription.findOne({ ci: e.ci });
        try {
          if (!exists) {
            const newInscription = new Inscription(e);
            const saveInscription = await newInscription.save();
          } else {
            const inscriptionUpdate = await Inscription.findByIdAndUpdate(
              exists.id,
              e,
              {
                new: true,
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
