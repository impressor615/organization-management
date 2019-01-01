import "./_message.scss";

import React, { Fragment, PureComponent} from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

import { Dispatch } from "@/@types/types";
import { hideMessage } from "@/actions";
import { StateInterface } from "@/reducers";
import { MessageType } from "@/reducers/commonUI";

interface Props {
  message: {
    type: MessageType,
    message: string;
  } | null;
  dispatch: Dispatch;
}

class Message extends PureComponent<Props, {}> {
  private clear: number | NodeJS.Timeout;

  public componentDidUpdate(prevProps: Props): void {
    const { message, dispatch } = this.props;
    if (!prevProps.message && message) {
      this.clear = setTimeout(() => dispatch(hideMessage()), 2000);
    }
  }

  public componentWillUnmount(): void {
    if (this.clear) {
      clearTimeout(this.clear as number);
    }
  }

  public render() {
    const { message } = this.props;
    return (
      <Fragment>
        {
          message
            ? <Alert
                color={ message.type === "error" ? "danger" : "success" }
                className="error-alert"
                toggle={this.onCloseClick}
              >
                {message.message}
              </Alert>
            : null
        }
      </Fragment>
    );
  }

  private onCloseClick = (): void => {
    const { dispatch } = this.props;
    dispatch(hideMessage());
  }
}

const mapStateToProps = (state: StateInterface)  => ({ message: state.commonUI.message });
export default connect(mapStateToProps)(Message);
