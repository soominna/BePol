export default {
  findOrCreate: (model, options, doc) => {
    model.findOne(options, (err, result) => {
      if (err) return null;
      else {
        if (result) {
          return { created: false, doc: result };
        } else {
          model.create(doc, (err, result) => {
            if (err) return { created: null, doc: null };
            return { created: false, doc: result };
          });
        }
      }
    });
  },
};
