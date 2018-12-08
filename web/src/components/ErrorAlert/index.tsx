import "./_error.scss";

import React, { Fragment, PureComponent} from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

import { Dispatch } from "@/@types/types";
import { clearError } from "@/actions";
import { StateInterface } from "@/reducers";

interface Props {
  error: string;
  dispatch: Dispatch;
}

class ErrorAlert extends PureComponent<Props, {}> {
  private clear: number | NodeJS.Timeout;

  public componentDidUpdate(prevProps: Props): void {
    const { error, dispatch } = this.props;
    if (!prevProps.error && error) {
      this.clear = setTimeout(() => dispatch(clearError()), 2000);
    }
  }

  public componentWillUnmount(): void {
    if (this.clear) {
      clearTimeout(this.clear as number);
    }
  }

  public render() {
    const { error } = this.props;
    return (
      <Fragment>
        {
          error
            ? <Alert
                color="danger"
                className="error-alert"
                toggle={this.onCloseClick}
              >
                {error}
              </Alert>
            : null
        }
      </Fragment>
    );
  }

  private onCloseClick = (): void => {
    const { dispatch } = this.props;
    dispatch(clearError());
  }
}

const mapStateToProps = (state: StateInterface)  => ({ error: state.commonUI.error });
export default connect(mapStateToProps)(ErrorAlert);
