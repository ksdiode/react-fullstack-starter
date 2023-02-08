export async function asyncTimeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('timeout');
    }, delay);
  });
}

export function buildExtraReducers(builder, field, asyncAction, custom) {
  builder
    .addCase(asyncAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(asyncAction.fulfilled, (state, action) => {
      state.loading = false;
      if (custom === undefined) {
        state[field] = action.payload;
      } else {
        custom(state, action.payload);
      }
    })
    .addCase(asyncAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
