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
        console.log('pedning');
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(action.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.status = 'fulfilled';
        state.loading = false;
        state[field] = action.payload;
      })
      .addCase(action.rejected, (state, action) => {
        console.log('reject');
        state.status = 'reject';

        state.loading = false;
        state.error = action.error;
      });
  });
}
