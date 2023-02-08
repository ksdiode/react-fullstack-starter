import { createThunk } from '../store/util';
import api from '.';

function createRestThunk(type, base) {
  const getList = createThunk(
    `${type}/getList`,
    async (params) => await api.get(base, { params })
  );
  const get = createThunk(
    `${type}/get`,
    async (id) => await api.get(`${base}/${id}`)
  );
  const create = createThunk(
    `${type}/getList`,
    async (body) => await api.post(base, body)
  );
  const update = createThunk(
    `${type}/get`,
    async (body) => await api.put(`${base}/${body.id}`, body)
  );
  const remove = createThunk(
    `${type}/get`,
    async (id) => await api.delete(`${base}/${id}`)
  );

  return {
    getList,
    get,
    create,
    update,
    remove,
  };
}

export default createRestThunk;
