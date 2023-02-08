async function tryDo(res, f) {
  try {
    const data = await f();
    res.json(data);
  } catch (e) {
    res.status(404).json(e);
  }
}

function createService(Model) {
  return {
    async getPage(req, res) {
      tryDo(res, async () => {
        const filter = req.query;
        delete filter.page;
        const { page = 1 } = req.query;
        const options = { page };
        return await Model.paginate(filter, options);
        // Model.paginate({}, options, function (err, result) {
        //   result.docs
        //   result.totalDocs = 100
        //   result.limit = 10
        //   result.page = 1
        //   result.totalPages = 10
        //   result.hasNextPage = true
        //   result.nextPage = 2
        //   result.hasPrevPage = false
        //   result.prevPage = null
        //   result.pagingCounter = 1
        // });
      });
    },

    async getOne(req, res) {
      tryDo(res, async () => {
        const { _id } = req.params;
        return await Model.findByIdAndUpdate(_id, req.body, { new: true });
      });
    },

    async create(req, res) {
      tryDo(res, async () => {
        const data = new Model(req.body);
        return await data.save();
      });
    },

    async update(req, res) {
      tryDo(res, async () => {
        const { _id } = req.params;
        return await Model.findByIdAndUpdate(_id, req.body, { new: true });
      });
    },

    async remove(req, res) {
      tryDo(res, async () => {
        const { _id } = req.params;
        return await Model.findByIdAndDelete(_id);
      });
    },
  };
}

export default createService;
