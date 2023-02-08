import { createThunk } from '../store/util';
import api from '.';

function createRestThunk(type, base) {
  const getList = createThunk(
    `${type}/getList`,
    async (params) => await api.get(base, { params })
  );

  const getOne = createThunk(
    `${type}/getOne`,
    async (id) => await api.get(`${base}/${id}`)
  );

  const create = createThunk(
    `${type}/create`,
    async (body) => await api.post(base, body)
  );

  const update = createThunk(
    `${type}/update`,
    async (body) => await api.put(`${base}/${body.id}`, body)
  );

  const remove = createThunk(
    `${type}/remove`,
    async (id) => await api.delete(`${base}/${id}`)
  );

  return {
    getList,
    getOne,
    create,
    update,
    remove,
  };
}

export default createRestThunk;
