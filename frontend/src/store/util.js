export async function asyncTimeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('timeout');
    }, delay);
  });
}

export function buildExtraReducers(builder, field, ...asyncActions) {
  asyncActions.forEach((action) => {
    builder
      .addCase(action.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(action.fulfilled, (state, action) => {
        state.loading = false;
        state[field] = action.payload;
      })
      .addCase(action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  });
}
